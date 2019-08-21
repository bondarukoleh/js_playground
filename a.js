// import {
//   AppCheckoutAPI,
//   AppOrderManagementAPI,
//   AppSellerOfficeAPI,
//   AppUserAccountAPI,
//   dbClient
// } from '@metromarkets/api-automation-testing';
// import * as faker from 'faker';
// import * as fs from 'fs';
// import * as path from 'path';
// import {browser} from 'protractor';
// import {buildRequest} from '../../testing-api/lib/utils/request';
// import {apiUrls, endpoints} from '../config/urls.conf';
// import {sellerRegisterData, wizardBuilder} from '../page_objects/seller/office/data';
// import {
//   createSeller,
//   createCustomer,
//   updateCustomer,
//   createOrder
// } from '../../testing-api/helpers';

// interface IOfferData {
//   id: string;
//   mid: string;
//   qty: number;
//   seller: string;
//   price: number;
// }

// interface ILoginData {
//   email: string;
//   password: string;
// }

// interface ISellerParameters {
//   login?: boolean;
//   skipWizard?: boolean;
//   wizard?: any; // use only objects from common.test.data.ts
// }

// interface ICustomerParameters {
//   personalInfo?: {firstName: string, lastName: string};
//   shoppingCart?: IProduct | IProduct[];
//   orders?: {
//     count?: number,
//     product?: IProduct | IProduct[],
//     orderData?: {
//       paymentMethod: string
//       shippingAddress: object
//       billingAddress: object
//     },
//     creationDelay?: boolean
//   };
//   login?: boolean;
//   address?: ICustomerAddress | ICustomerAddress[] | true;
// }

// interface ICustomerAddress {
//   country: string;
//   postalCode: string;
//   city: string;
//   addressLine: string;
//   addressLine2?: string;
//   firstName: string;
//   lastName: string;
//   defaultShipping?: boolean;
//   defaultBilling?: boolean;
// }

// interface IProduct {
//   id?: null | string;
//   qty?: number;
// }

// const getLoginData = (): ILoginData => {
//   return {email: faker.internet.email(), password: '123123Q@q'};
// };

// const getAddress = ({countryCode = false, shipping = true, billing = true} = {}) => {
//   return {
//     firstName: faker.name.firstName(),
//     lastName: faker.name.lastName(),
//     addressLine: faker.address.streetAddress(),
//     addressLine2: faker.address.secondaryAddress(),
//     country: countryCode ? 'de' : 'Germany', // TODO: change when figured out logic
//     postalCode: faker.address.zipCode('#####'),
//     city: faker.address.city(),
//     defaultShipping: shipping,
//     defaultBilling: billing
//   };
// };

// const getOrder = (): {paymentMethod: string, shippingAddress: {}, billingAddress: {}} => {
//   return {
//     paymentMethod: 'Cash-in-Advance',
//     shippingAddress: getAddress({countryCode: true}),
//     billingAddress: getAddress({countryCode: true})
//   };
// };

// async function getSeller(parameters: ISellerParameters): Promise<{login: ILoginData}> {
//   const {login = false, skipWizard = true, wizard} = parameters;
//   const sellerData = sellerRegisterData().generate().toWeb();
//   const responseBody = await createSeller({registerData: sellerData});

//   if (wizard) {
//     await changeSellerWizard(responseBody.access_token, wizard);
//   }

//   if (skipWizard) {
//     if (!wizard) {
//       await changeSellerWizard(responseBody.access_token, wizardBuilder().build().generate().toApi());
//     }
//     await completeSellerWizard(responseBody.access_token);
//   }

//   if (login) {
//     await browser.executeScript(`localStorage.setItem('sdk/auth', arguments[0])`, JSON.stringify(responseBody));
//     skipWizard // TODO remove when browser.refresh() will work
//       ? await browser.get(endpoints.seller.workplace.dashboard)
//       : await browser.get(endpoints.seller.wizard.membership);
//     // await browser.refresh();
//   }

//   const {email, password} = sellerData;
//   return {login: {email, password}};
// }

// async function getCustomer({personalInfo, shoppingCart, orders, address, login = false}: ICustomerParameters)
//   : Promise<ILoginData> {
//   const customerData = getLoginData();
//   const responseBody = await createCustomer({registerData: customerData});
//   const {access_token: token} = responseBody;
//   if (personalInfo) {
//     await updateCustomer({token, personalInfo});
//   }

//   if (address) {
//     await createCustomerAddress(address, token);
//   }

//   if (orders) {
//     const {count, product = [{id: null, qty: 1}], orderData = getOrder(), creationDelay = false} = orders;
//     for (let i = 0; i < count; i++) {
//       await addProductToCart(token, product);
//       await createOrder({token, orderData});
//       if (creationDelay) {
//         await sleep();
//       }
//     }
//   }

//   if (shoppingCart) {
//     await addProductToCart(token, shoppingCart);
//   }
//   const {login: {email, password}, address: [{street}]} = await apiGetCus();
//   if (login) {
//     await browser.executeScript(`localStorage.setItem('sdk/auth', arguments[0])`, JSON.stringify(responseBody));
//     await browser.refresh();
//   }
//   return {login: data};
// }

// // API methods
// // async function createSeller(loginData: ISellerRegisterData) {
// //   const response = await new AppSellerOfficeAPI(apiUrls.sellerOffice).register(loginData);
// //   if (!response.body.token_type || !response.body.access_token) {
// //     throw new Error(`Server response error ${JSON.stringify(response.body)}`);
// //   }
// //   return response.body;
// // }

// // async function createCustomer(loginData: ILoginData) {
// //   const response = await new AppUserAccountAPI(apiUrls.userAccount).register(loginData);
// //   if (!response.body.token_type || !response.body.access_token) {
// //     throw new Error(`Server response error ${JSON.stringify(response.body)}`);
// //   }
// //   return response.body;
// // }

// // async function updateCustomer(accessToken: string, personalInfo: {firstName: string, lastName: string}) {
// //   const userAccountApi = new AppUserAccountAPI(apiUrls.userAccount);
// //   userAccountApi.setToken = accessToken;
// //   const updateResponse = await userAccountApi.updateConsumer(personalInfo);
// //   if (updateResponse.status !== 200) {
// //     throw new Error(`Update user fails. Server response error: ${JSON.stringify(updateResponse.body)}`);
// //   }
// // }

// async function addProductToCart(accessToken: string, productData: IProduct | IProduct[]) {
//   const products = Array.isArray(productData) ? productData : [productData];
//   const ids = await getOfferIds(products.length);

//   for (const [index, product] of products.entries()) {
//     if (!product.id) {
//       product.id = ids[index];
//     }

//     const checkoutApi = new AppCheckoutAPI(apiUrls.checkout);
//     checkoutApi.setToken = accessToken;
//     const response = await checkoutApi.addOfferToCart({quantity: product.qty, offer: product.id});
//     if (response.status !== 201) {
//       throw new Error(`Add offer to cart failed. Server response error: ${JSON.stringify(response.body)}`);
//     }
//   }
// }

// // async function createOrder(accessToken: string, orderData: object) {
// //   const checkoutApi = new AppCheckoutAPI(apiUrls.checkout);
// //   checkoutApi.setToken = accessToken;
// //   const response = await checkoutApi.createOrder(orderData);
// //   if (response.status !== 201) {
// //     throw new Error(`Create order failed. Server response error: ${JSON.stringify(response.body)}`);
// //   }
// // }

// async function createCustomerAddress(address, token = null) {
//   if (token === null) {
//     token = await getUserTokenFromBrowser();
//   }
//   const addresses = address === true
//     ? [getAddress({countryCode: true})]
//     : Array.isArray(address) ? address : [address];
//   const userAccountApi = new AppUserAccountAPI(apiUrls.userAccount);
//   userAccountApi.setToken = token;
//   for (const eachAddress of addresses) {
//     const updateResponse = await userAccountApi.createConsumerAddress(eachAddress);
//     if (updateResponse.status !== 201) {
//       throw new Error(`Create customer address failed. Server response error: ${JSON.stringify(updateResponse.body)}`);
//     }
//     await sleep(); // Needs for correct work: "last added address becomes default shipping or billing"
//   }
// }

// async function sellerUpload(files: string, token: string) {
//   const orderManagementApi = new AppOrderManagementAPI(apiUrls.orderManagement);
//   orderManagementApi.setToken = token;

//   const uploads = [];
//   for (const filePath of files.split(',')) {
//     const {name, ext} = path.parse(filePath);
//     const fileType = ext.replace('.', '').toLowerCase();
//     if (!['pdf', 'png', 'jpeg'].includes(fileType)) {
//       throw new Error(`Can't upload file type = '${fileType}'`);
//     }
//     const contentType = fileType === 'pdf' ? 'application/pdf' : `image/${fileType}`;
//     const documentUploadData = {contentType: contentType, entity: `offer_${fileType}`};

//     const response = await orderManagementApi.createDocumentUploadUrl(documentUploadData);
//     if (response.status !== 201) {
//       throw new Error(`Document upload failed. Server response error: ${JSON.stringify(response.body)}`);
//     }
//     const uploadData = response.body;

//     const fileContent = fs.readFileSync(filePath).toString('utf8');
//     const response1 = await buildRequest('').put({path: uploadData.url, body: fileContent, headers: {'Content-Type': contentType}});
//     if (response1.status !== 200) {
//       throw new Error(`Document upload failed. Server response error: ${JSON.stringify(response1.body)}`);
//     }

//     uploads.push({
//       name: `${name}${ext}`,
//       mimeType: contentType,
//       id: uploadData.id,
//       size: fs.statSync(filePath)['size']
//     });
//   }

//   return uploads;
// }

// async function changeSellerWizard(token, wizard) {
//   const {organization: {taxCertificate = [], tradeRegistration = [], naturalPerson = null, legalPerson = null}} = wizard;
//   wizard.organization.taxCertificate = typeof taxCertificate === 'string' ? await sellerUpload(taxCertificate, token) : taxCertificate;
//   wizard.organization.tradeRegistration = typeof tradeRegistration === 'string'
//     ? await sellerUpload(tradeRegistration, token)
//     : tradeRegistration;

//   if (naturalPerson) {
//     const {identityCard = []} = naturalPerson;
//     wizard.organization.naturalPerson.identityCard = typeof identityCard === 'string'
//       ? await sellerUpload(identityCard, token)
//       : identityCard;
//   }
//   if (legalPerson) {
//     const {commercialRegister = [], beneficialOwnerProof = []} = legalPerson;
//     wizard.organization.legalPerson.commercialRegister = typeof commercialRegister === 'string'
//       ? await sellerUpload(commercialRegister, token)
//       : commercialRegister;
//     wizard.organization.legalPerson.beneficialOwnerProof = typeof beneficialOwnerProof === 'string'
//       ? await sellerUpload(beneficialOwnerProof, token)
//       : beneficialOwnerProof;
//   }

//   const sellerOfficeApi = new AppSellerOfficeAPI(apiUrls.sellerOffice);
//   sellerOfficeApi.setToken = token;
//   const updateResponse = await sellerOfficeApi.changeWizard(wizard);
//   if (updateResponse.status !== 204) {
//     throw new Error(`Set seller wizard failed. Server response: ${JSON.stringify(updateResponse.body)}`);
//   }
// }

// async function completeSellerWizard(token) {
//   const sellerOfficeApi = new AppSellerOfficeAPI(apiUrls.sellerOffice);
//   sellerOfficeApi.setToken = token;
//   const completeResponse = await sellerOfficeApi.completeWizard();
//   if (completeResponse.status !== 204) {
//     throw new Error(`Complete seller wizard failed. Server response: ${JSON.stringify(completeResponse.body)}`);
//   }
// }

// async function sleep(ms = 1000) {
//   return new Promise((res) => setTimeout(res, ms));
// }

// // async function getMaxPriceFromOffers(): Promise<number> {
// //   const appSearchAPI = new AppSearchAPI(apiUrls.search);
// //   const {body: {items: [{bestOffer: {price: {amount}}}]}} = await appSearchAPI.getBestOffer('?sort[price]=DESC&limit=1');
// //   return +amount;
// // }

// async function getUserTokenFromBrowser() {
//   return JSON.parse(await browser.executeScript(`return localStorage.getItem('sdk/auth')`)).access_token;
// }

// async function getProductInfo(productName: string = 'Baby Einstein Mitnehm Tunes Spieluhr')
//   : Promise<{id: string, name: string, longDescription: {default: string, [key: string]: string}, offers: IOfferData[]}> {
//   const data = await dbClient.select(
//     'i.description_long',
//     'i.translations',
//     'i.mid',
//     'i.id_item',
//     'o.id_offer',
//     'o.price_amount',
//     'oi.quantity',
//     'org.name',
//   ).from('item AS i')
//     .join('offer AS o', 'o.id_item', 'i.id_item')
//     .join('offer_inventory AS oi', 'oi.id_offer_inventory', 'o.id_offer_inventory')
//     .join('organization AS org', 'org.id_organization', 'o.id_organization')
//     .where('i.name', productName)
//     .andWhere('o.is_active', 1)
//     .orderBy('o.price_amount', 'asc');
//   if (!data.length) {
//     throw new Error(`Can't get data for '${productName}' product.`);
//   }
//   const [{id_item: productId, description_long, translations}] = data;
//   const description = {default: description_long};
//   if (translations !== null) {
//     Object.entries(JSON.parse(data[0].translations))
//       .filter(([value]) => value['description_long'])
//       .forEach(([key, value]) => description[key] = value['description_long']);
//   }
//   const offers = data.reduce((acc, cur) => {
//     acc.push({
//       id: cur.id_offer,
//       mid: cur.mid,
//       qty: cur.quantity,
//       seller: cur.name,
//       price: cur.price_amount,
//     });
//     return acc;
//   }, []);
//   return {id: productId, name: productName, longDescription: description, offers};
// }

// async function getOfferIds(count: number) {
//   return dbClient.select('o.id_offer')
//     .from('offer AS o')
//     .join('offer_inventory AS oi', 'o.id_offer_inventory', 'oi.id_offer_inventory')
//     .where('oi.quantity', '>', 0)
//     .andWhere('o.is_active', 1)
//     .orderBy('oi.quantity', 'desc')
//     .limit(count)
//     .map((data) => data.id_offer);
// }

// async function getCategoryId(categoryName: string = 'Precision tape'): Promise<string> {
//   const [{id_category}] = await dbClient.select('id_category').from('category').where('name', categoryName);
//   return id_category;
// }

// async function getProductIdsThatExistInInventory(): Promise<{productId: string}[]> {
//   const queryResult = await dbClient.select('id_item')
//     .sum({qty_from_all_offers: 'quantity'})
//     .from('offer_inventory')
//     .groupBy('id_item')
//     .having('qty_from_all_offers', '>', 1);
//   return queryResult.map((el) => ({productId: el.id_item}));
// }

// async function getProductsWithEnergyEffLabel():
//   Promise<{productId: string, energyEffLabel: string, energyEffRangeType: 'a+++ToF' | 'aToG'}[]> {
//   const queryResult = await dbClient.select(
//     'i.id_item',
//     'iav.value as item_value',
//     dbClient.raw(`IF (JSON_CONTAINS(catav.value, '{"A":"f3f300"}'), 'a+++ToF', 'aToG') as range_type`)
//   ).from('attribute_set_category AS ascat')
//     .join('item AS i', 'ascat.id_attribute_set', 'i.id_attribute_set')
//     .join('category_attribute_value AS catav', 'ascat.id_category', 'catav.id_category')
//     .join('item_attribute_value AS iav', 'i.id_item', 'iav.id_item')
//     .whereRaw(`(JSON_CONTAINS(catav.value, '{"A":"f3f300"}') OR JSON_CONTAINS(catav.value, '{"A":"02964d"}'))`)
//     .whereIn('iav.value', ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'A+', 'A++', 'A+++']);
//   return queryResult.map((el) => ({productId: el.id_item, energyEffLabel: el.item_value, energyEffRangeType: el.range_type}));
// }

// async function getProductsWithoutEnergyEffLabel(): Promise<{productId: string}[]> {
//   const existingProducts = await getProductIdsThatExistInInventory();
//   const productsWithEnergyEffLabel = await getProductsWithEnergyEffLabel();
//   return existingProducts.filter((el) => productsWithEnergyEffLabel.every((prod) => prod.productId !== el.productId));
// }

// async function getProductWithoutBrand() {
//   const [{id_item}] = await dbClient.select('i.id_item', 'oi.quantity', 'o.id_offer')
//     .from('item AS i')
//     .join('offer AS o', 'i.id_item', 'o.id_item')
//     .join('offer_inventory AS oi', 'oi.id_offer_inventory', 'o.id_offer_inventory')
//     .whereRaw(`oi.quantity > 0 AND i.id_brand is null`)
//     .limit(1);
//   return id_item;
// }

// async function getProductsIdWithZeroQuantity(): Promise<{seller: string, productId: string, price: number}[]> {
//   const queryResult = await dbClient.select('org.name', 'oi.id_item', 'o.price_amount')
//     .from('offer AS o')
//     .join('offer_inventory AS oi', 'o.id_offer_inventory', 'oi.id_offer_inventory')
//     .join('organization AS org', 'o.id_organization', 'org.id_organization')
//     .where('oi.quantity', '=', 0)
//     .orderBy('o.price_amount', 'asc');
//   if (!queryResult.length) {
//     throw new Error(`Can't get data for products with zero quantity`);
//   }
//   return queryResult.map((el) => ({seller: el.name, productId: el.id_item, price: el.price_amount}));
// }

// async function getProductsWithOffers(): Promise<{productId: string, offers: {offerId: string, qty: number, price: number}[]}[]> {
//   const products = await dbClient.select('i.id_item', 'i.name', 'oi.quantity', 'o.id_offer', 'o.price_amount')
//     .from('item AS i')
//     .join('offer AS o', 'i.id_item', 'o.id_item')
//     .join('offer_inventory AS oi', 'oi.id_offer_inventory', 'o.id_offer_inventory')
//     .whereRaw(
//       `oi.id_item NOT IN
//       (SELECT o.id_item FROM offer AS o JOIN offer_inventory AS oi ON oi.id_offer_inventory=o.id_offer_inventory WHERE oi.quantity=0);`
//     );
//   const productsWithOffers = products.reduce((acc, curr) => {
//     let product = acc.find((el) => el.productId === curr.id_item);
//     if (!product) {
//       acc.push({productId: curr.id_item, name: curr.name, offers: []});
//       product = acc.last();
//     }
//     product.offers.push({offerId: curr.id_offer, qty: curr.quantity, price: curr.price_amount});
//     return acc;
//   }, []);
//   for (const item of productsWithOffers) {
//     item.offers.sort((a, b) => a.price - b.price);
//   }
//   return productsWithOffers;
// }

// export {
//   getSeller,
//   getCustomer,
//   getCategoryId,
//   getLoginData,
//   getAddress,
//   getProductInfo,
//   sleep,
//   // getMaxPriceFromOffers,
//   createCustomerAddress,
//   getProductIdsThatExistInInventory,
//   getProductsWithEnergyEffLabel,
//   getProductsWithoutEnergyEffLabel,
//   getProductWithoutBrand,
//   getProductsIdWithZeroQuantity,
//   getProductsWithOffers
// };

// ============================================================

// const {
//   AppSellerPimAPI,
//   AppSellerOfficeAPI,
//   AppUserAccountAPI,
//   AppSearchAPI,
//   AppCheckoutAPI
// } = require('../lib')
// const {approveSellerUploads, waitUploadedFileStatus} = require('../lib/commons')
// const urls = require('../config/urls.config');


// /**
//  * @param fileName {string}
//  * @param token {string | function}
//  * @param sellerPimUrl {string}
//  * @returns {Promise<void>}
//  */
// async function approveSellerUpload({fileName, token = null, sellerPimUrl = undefined}) {
//   if(typeof token === 'function') {
//     token = await token();
//   }
//   const appSellerPimAPI = new AppSellerPimAPI(sellerPimUrl);
//   appSellerPimAPI.setToken = token;
//   await approveSellerUploads({appSellerPimAPI, productFileName: fileName});
//   await waitUploadedFileStatus({appSellerPimAPI, uploadStatus: ['with_errors', 'success']})
// }

// /**
//  * @param registerData {object}
//  * @param registerData.email {string}
//  * @param registerData.password {string}
//  * @param sellerOfficeUrl {string}
//  * @returns {Promise<any>}
//  */
// async function createSeller({registerData, sellerOfficeUrl = undefined}) {
//   const {body} = await new AppSellerOfficeAPI(sellerOfficeUrl).register(registerData)
//   if (!body.token_type || !body.access_token) {
//     throw new Error(`Server response error ${JSON.stringify(body)}`);
//   }
//   return body;
// }

// /**
//  * @param registerData {object}
//  * @param registerData.email {string}
//  * @param registerData.password {string}
//  * @param userAccountUrl {string}
//  * @returns {Promise<any>}
//  */
// async function createCustomer({registerData, userAccountUrl = undefined}) {
//   const {body} = await new AppUserAccountAPI(userAccountUrl).register(registerData);
//   if (!body.token_type || !body.access_token) {
//     throw new Error(`Server response error ${JSON.stringify(body)}`);
//   }
//   return body;
// }

// /**
//  *
//  * @param token {string | function}
//  * @param personalInfo {object}
//  * @param personalInfo.firstName {string}
//  * @param personalInfo.lastName {string}
//  * @param userAccountUrl {string}
//  * @returns {Promise<void>}
//  */
// async function updateCustomer({token, personalInfo, userAccountUrl = undefined}) {
//   console.log('%j', arguments)
//   const userAccountApi = new AppUserAccountAPI(urls.appUserAccount);
//   if(typeof token === 'function') {
//     token = await token();
//   }
//   userAccountApi.setToken = token;
//   const {body, status} = await userAccountApi.updateConsumer(personalInfo);
//   if (status !== 200) {
//     throw new Error(`Update user fails. Server response error: ${JSON.stringify(body)}`);
//   }
// }

// /**
//  * @returns {Promise<number>}
//  */
// async function getMaxPriceFromOffers(searchUrl = undefined) {
//   const appSearchAPI = new AppSearchAPI(searchUrl);
//   const {body: {items: [{bestOffer: {price: {amount}}}]}} = await appSearchAPI.getBestOffer('?sort[price]=DESC&limit=1');
//   return +amount;
// }

// /**
//  * @param token {string | function}
//  * @param orderData {object}
//  * @param checkoutUrl {string}
//  * @returns {Promise<void>}
//  */
// async function createOrder({token, orderData, checkoutUrl = undefined}) {
//   const checkoutApi = new AppCheckoutAPI(checkoutUrl);
//   if(typeof token === 'function') {
//     token = await token();
//   }
//   checkoutApi.setToken = token;
//   const {status, body} = await checkoutApi.createOrder(orderData);
//   if (status !== 201) {
//     throw new Error(`Create order failed. Server response error: ${JSON.stringify(body)}`);
//   }
// }

// module.exports = {
//   approveSellerUpload,
//   createSeller,
//   createCustomer,
//   updateCustomer,
//   getMaxPriceFromOffers,
//   createOrder
// }

const tokenf = () => new Promise((res) => setTimeout((arg) => res(arg), 500, 'argument'))

async function getTokenIfFunction (token) {
  return typeof token === 'function' ? await token() : token;
}

async function myFunc(){
  console.log('Function done', await getTokenIfFunction(tokenf))
}

myFunc()