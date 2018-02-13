const BUY_SIGN = 1;
const SELL_SIGN = -1;

/**
 * Signs a message.
 *
 * @param web3
 * @param address
 * @param message
 * @return {[*,*,*]}
 */
export const signMessage = function (web3, address, message) {
  const signature = web3.eth.sign(address, message);
  const r = signature.slice(0, 66);
  const s = `0x${signature.slice(66, 130)}`;
  let v = web3.toDecimal(`0x${signature.slice(130, 132)}`);
  if (v !== 27 && v !== 28) v += 27;
  return [v, r, s];
};

/**
 *
 * @param priceFloor
 * @param priceCap
 * @param qtyMultiplier
 * @param qty
 * @param price
 * @return {number}
 */
export const calculateCollateral = function (priceFloor, priceCap, qtyMultiplier, qty, price) {
  const zero = 0;
  let maxLoss;
  if (qty > zero) {
    if (price <= priceFloor) {
      maxLoss = zero;
    } else {
      maxLoss = price - priceFloor;
    }
  } else {
    if (price >= priceCap) {
      maxLoss = zero;
    } else {
      maxLoss = priceCap - price;
    }
  }
  return maxLoss * Math.abs(qty) * qtyMultiplier;
};

// TODO: move me to wherever I belong -clean up, add documentation, figure out how best to create order object in JS
export const getBids = function (web3, marketContract, orderLib) {
  // for now we will create orders around the contract mid price, eventually we should create orders
  // that are around an price pulled from an active API that mimics the oracle solution
  const contractMidPrice = (marketContract.PRICE_FLOOR.call().toNumber() +
    marketContract.PRICE_CAP.call().toNumber()) / 2;
  // we will need to fix this, the server will need to have an unlocked account created the order for the user to match
  // here we are just using an account that we only have access to in the dev environment, but wont be able
  // to use when we attempt to deploy to a test net (rinkeby)
  return createNewOrders(
    web3,
    marketContract,
    orderLib,
    web3.eth.accounts[9],
    contractMidPrice - BUY_SIGN, // subtract our sign so our market are not crossed.
    SELL_SIGN,
    5
  );
};


export const getAsks = function (web3, marketContract, orderLib) {
  // for now we will create orders around the contract mid price, eventually we should create orders
  // that are around an price pulled from an active API that mimics the oracle solution
  const contractMidPrice = (marketContract.PRICE_FLOOR.call().toNumber() +
    marketContract.PRICE_CAP.call().toNumber()) / 2;
  // we will need to fix this, the server will need to have an unlocked account created the order for the user to match
  // here we are just using an account that we only have access to in the dev environment, but wont be able
  // to use when we attempt to deploy to a test net (rinkeby)
  return createNewOrders(
    web3,
    marketContract,
    orderLib,
    web3.eth.accounts[9],
    contractMidPrice - SELL_SIGN, // subtract our sign so our market are not crossed.
    SELL_SIGN,
    5
  );
};


const createNewOrders = async function (web3,
                                        marketContract,
                                        orderLib,
                                        makerAccount,
                                        startingPrice,
                                        mktSign,
                                        desiredOrderCount) {
  if (desiredOrderCount <= 0)
    return null;

  startingPrice = Math.trunc(startingPrice);  //convert to integer
  const orders = [];
  const orderQty = 1 * mktSign;               // for now all orders have qty of 1 (+1 for bid, -1 for sell)
  const expirationTimeStamp = Math.floor(Date.now() / 1000) + 86400;  // order expires in a day.
  const takerAccount = null;
  const feeRecipient = null;
  const makerFee = 0;
  const takerFee = 0;

  for (let i = 0; i < desiredOrderCount; i++) {
    const newOrderPrice = startingPrice - (i * mktSign);
    const order = new Order(marketContract.address, makerAccount, takerAccount, feeRecipient, makerFee, takerFee,
      newOrderPrice, expirationTimeStamp, 1, orderQty);
    await order.getOrderHash(orderLib);
    order.signOrder(web3, makerAccount);
    orders.push(order);
  }

  return orders;
};



class Order {

  constructor(contractAddress,
              maker,
              taker,
              feeRecipient,
              makerFee,
              takerFee,
              price,
              expirationTimeStamp,
              salt,
              orderQty,
  ) {
    this.contractAddress = contractAddress;
    this.maker = maker;
    this.taker = taker;
    this.feeRecipient = feeRecipient;
    this.makerFee = makerFee;
    this.takerFee = takerFee;
    this.price = price;
    this.expirationTimeStamp = expirationTimeStamp;
    this.salt = salt;
    this.orderQty = orderQty;
    this.orderHash = null;
    this.orderAddresses = [maker, taker, feeRecipient];
    this.unsignedOrderValues = [makerFee, takerFee, price, expirationTimeStamp, salt];
    this.v = null;
    this.r = null;
    this.s = null;
    this.isSigned = false;
  }

  async getOrderHash(orderLib) {
    if(this.orderHash != null)
      return this.orderHash;

    let orderHash = await orderLib.createOrderHash.call(
      this.contractAddress,
      this.orderAddresses,
      this.unsignedOrderValues,
      this.orderQty
    );

    this.orderHash = orderHash;
    return this.orderHash;
  }

  signOrder(web3, makerAccount) {
    if(this.isSigned)
      return;
    const signature = signMessage(web3, makerAccount, this.orderHash);
    this.v = signature[0];
    this.r = signature[1];
    this.s = signature[2];
    this.isSigned = true;
  }

}

