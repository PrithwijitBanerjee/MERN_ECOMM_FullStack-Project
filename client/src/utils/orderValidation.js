import * as Yup from 'yup';

export const orderValidation = Yup.object().shape({
    shippingAddress1: Yup.string().required('**Primary Shipping address is required'),
    shippingAddress2: Yup.string().required('**Secondary Shipping address is required'),
    city: Yup.string().required('**City is required'),
    phone: Yup.number().required('**Phone No. is required'),
    zip: Yup.number().required('**Zip code is required'),
    country: Yup.string().required('**Country name is required'),
    cardName: Yup.string().required('**Card name is required'),
    cardNo: Yup.string().required('**Card no. is required'),
    expiration: Yup.string().required('**Card expiration date is required'),
    cvv: Yup.string().required('**CVV no. is required'),
});