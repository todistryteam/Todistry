var env = require('../../config/environment')
var pdf = require('html-pdf')
const order_items = require('../orders/orderItems.model')

class InvoiceService {
    
    constructor(){
        console.log("entered constructor of pdf generate")
    }

    async saveInvoicePDF(email, orderData,logo,address) {
        try{
            let product_body = ''
            await Promise.all(orderData.order_items.map(async (order_item) => {
                let variation_html_body = ''
                let sku=order_item.product.sku
                order_items?.product_variations_combination?.product_variations.values?.length > 0 &&(
                  sku=order_items?.product_variations_combination.sku
                )
                order_item?.product_variations_combination?.product_variations_values?.length > 0 &&
                await Promise.all(order_item?.product_variations_combination?.product_variations_values.map(async (variations) => (
                            variation_html_body +=`${variations.attribute?.name || ''}: ${variations.attribute_value.attribute_value}<br/>`                        
                    ),
                    
                ))
                product_body +=`<tr key={i}>
                <td>
                  <table>
                    <tr><td>
                    <img src="${order_item.product.image}" height="60"  width="60" alt='' />
                    </td>
                    <td>
                       ${order_item.product.name}<br />SKU : ${sku}<br />${variation_html_body}
                    </td>
                  </tr></table>
                  </td>
                <td class="text-center">${order_item.qty}</td>
                <td class="text-center">${orderData.currency_symbol} ${order_item.price}</td>
                <td class="text-center">${orderData.currency_symbol} ${order_item.qty * order_item.price}</td>
            </tr>`
                
            }))
            
let pdfhtml=`<html><head>
<meta name="viewport" content="width=device-width, user-scalable=no" />
<style>
p,table td,table th{font-family: 'arial', 'helvetica neue', 'helvetica', 'sans-serif';font-size: 16px;}
.text-center{text-align:center}
.invoice_download_pdf table td,
.invoice_download_pdf table th {
  border: 1px solid #000;
}
strong{font-weight:bold}

.invoice_download table thead th{background-color: #000; padding: 5px; color: #fff; text-transform: uppercase; font-size: 14px;}

</style>
</head>
<body>
<div class='invoice_download' style="padding:20px">
<table width="100%" style="margin-bottom:10px">
<tr>
  <td><img src="${logo}" width="150" alt='Logo' /></td>
  <td align="right"><h5>INVOICE #${orderData.order_number}</h5></td>
  </tr>
</table>
<table width="100% style="margin-bottom:10px">
  <tr><td>
 <p style="white-space:pre-wrap">${address}</p>
  </td>
  <td align="right">
    Invoice Date : ${orderData.order_date}<br />
    Order No : ${orderData.order_number}<br />
    Order Date : ${orderData.order_date}<br />
    Payment Method : ${orderData.payment_type}
  </td>
  </tr>
</table>
<table style="margin-bottom:10px" width="100%">
  <tr>
  <td>
    <b>Billing Address</b>
    <br />
    ${("billing_first_name" in orderData)?orderData.billing_first_name!=''?orderData.billing_first_name:orderData.shipping_first_name:orderData.shipping_first_name} ${("billing_last_name" in orderData)?orderData.billing_last_name!=''?orderData.billing_last_name:orderData.shipping_last_name:orderData.shipping_last_name}
    <br />
    ${("billing_street_address" in orderData)?orderData.billing_street_address!=''?orderData.billing_street_address:orderData.shipping_street_address:orderData.shipping_street_address}
    <br />
    ${("billing_city" in orderData)?orderData.billing_city!=''?orderData.billing_city:orderData.shipping_city:orderData.shipping_city}, ${("billing_state" in orderData)?orderData.billing_state!=''?orderData.billing_state:orderData.shipping_state:orderData.shipping_state}, ${("billing_postcode" in orderData)?orderData.billing_postcode!=''?orderData.billing_postcode:orderData.shipping_postcode:orderData.shipping_postcode}
    <br />
    Email : ${orderData.user.email}
    <br />
    Phone : ${orderData.user.mobile}
  </td>
  <td align="right">
    <b>Shipping Address</b>
    <br />
    ${orderData.shipping_first_name} ${orderData.shipping_last_name}
    <br />
    ${orderData.shipping_street_address}
    <br />
    ${orderData.shipping_city}, ${orderData.shipping_state}, ${orderData.shipping_postcode}
  </td>
  </tr>
</table>

  <table className="fs-13" width="100%" style="margin-bottom:10px">
                            <thead>
                                <tr key='1' class="text-center"><th>Product</th><th class="text-center">Quantity</th><th class="text-center">Price</th><th class="text-center">Total Price</th></tr>
                            </thead>
                            <tbody>
                            ${product_body}
                            </tbody>
                            </table>

    <table width="100%" style="margin-bottom:10px">
     <tr>
                            <td align="right">
                                <table>
                                    <tbody>
                                    <tr><td><b>Sub Total:</b></td><td>${orderData.currency_symbol} ${orderData.sub_total}</td></tr>
                                    <tr><td><b>Discount:</b></td><td>${orderData.discount_total!=0?'+':''} ${orderData.currency_symbol} ${orderData.discount_total}</td></tr>
                                    <tr><td><b>Shipping:</b></td><td>${orderData.shipping_charge!=0?'+':''} ${orderData.currency_symbol} ${orderData.shipping_charge}</td></tr>
                                    <tr><td class="fs-18"><b>Total:</b></td><td class="fs-18">${orderData.currency_symbol} ${orderData.total}</td></tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
    </tr>
    <tr><td>
                        <p style="text-align:center;margin-top:50%">This is a system generated invoice, Hence Signature not required.</p>
                        </td></tr>
  </table></body>
  </html>
                            `
                           
            let optionss = { format: 'A4' };
            
            pdf.create(pdfhtml, optionss).toFile(env.invoice_path+'/'+orderData.order_number+'.pdf', function (err, res) {
                if (err) return console.log(err);
                console.log(res.filename);
            })

        } catch (error) {
            console.log(error)
            return error
        }   
    }
}
module.exports=InvoiceService;
