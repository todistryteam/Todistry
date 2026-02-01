var Sequelize = require('sequelize')
const Op = Sequelize.Op

var orders = require('../orders/orders.model')
var orderItems = require('../orders/orderItems.model')
var products = require('../products/products.model')
var product_images = require('../products/product_images.model')
var user = require('../user/user.model')
var categories = require('../categories/categories.model')
var env = require('../../config/environment')
var jwt = require('jsonwebtoken')
var auth = require('../../auth/auth.service')
const moment = require('moment')

const productAttributes = ['id', 'name', 'image', 'image_back', 'brand_id', 'model_id', 'short_description', 'description', 'sku', 'meta_title', 'meta_description', 'keywords', 'tags', 'badges', 'size_chart', 'size_chart_image', 'qty', 'old_price', 'price', 'discount', 'weight', 'length', 'width', 'height', 'is_in_stock', 'is_featured', 'is_best_selling_product', 'is_todays_deal', 'is_variation_product', 'status', 'created_at' ];

const productIncludes = []

exports.getDashboardCounts = async (req, res) => {
	try {
		var sessionData = await jwt.verify(req.headers.accesstoken, env.ACCESS_TOKEN_SECRET);
		var user_id = sessionData.user_id
		
		const counts = {}
		
		let totalCategories = await categories.count()
		let totalCustomers = await user.count()
		let totalProducts = await products.count()
		let totalOrders = await orders.count()
		let totalPendingOrders = await orders.count({
			where:{ 
				[Op.and]: [
					{
						order_status: {
							[Op.ne]: 'Delivered'
						}
					},
					{
						order_status: {
							[Op.ne]: 'Canceled'
						}
					}
				]
			}
		})
		let totalDeliveredOrders = await orders.count({
			where:{order_status: 'Delivered'}
		})
		let totalCanceledOrders = await orders.count({
			where:{order_status: 'Canceled'}
		})

		counts.totalOrders = totalOrders
		counts.totalPendingOrders = totalPendingOrders
		counts.totalDeliveredOrders = totalDeliveredOrders
		counts.totalCanceledOrders = totalCanceledOrders

		counts.totalProductSale = 0
		counts.todayProductOrder = 0
		counts.thisMonthSale = 0
		counts.thisYearProductSale = 0

		counts.totalEarning = 0
		counts.todayPendingEarning = 0
		counts.thisMonthEarning = 0
		counts.thisYearEarning = 0

		counts.totalProducts = totalProducts
		counts.totalCustomers = totalCustomers
		counts.totalCategories = totalCategories
		
		res.status(200).json({ success: 1, message: 'Results', data: counts })
	} catch (error) {
		console.log(error)
		res.status(200).json({
			success: 0,
			message: 'error!'
		})
	}
}

exports.getRecentOrders = async (req, res) => {
	try {
		var sessionData = await jwt.verify(req.headers.accesstoken, env.ACCESS_TOKEN_SECRET);
		var user_id = sessionData.user_id
	  
		var whereClauseOrder = []
		whereClauseOrder.push({
			is_deleted : 'No'
		})
		whereClauseOrder.push({
			invoice_number: {
				[Op.ne]: ''
			}
		})

		orders.findAll({
		  	where: whereClauseOrder,
			attributes: [
				'id',
				'order_number',
				'invoice_number',
				'order_date',
				'user_id',
				'contact_info',
				'shipping_street_address',
				'shipping_country',
				'shipping_state',
				'shipping_postcode',
				'sub_total',
				'total',
				'payment_type',
				'payment_status',
				'order_status',
				'is_canceled',
				'created_at'
			],
			include: [
				{
					attributes: [
						'id',
						'order_id',
						'product_id',
						'price',
						'qty'
					],
					model: orderItems,
					include: [
						{
							attributes: [
								'id',
								'name',
								'image'
							],
							model: products,
						}
					]
				},
				{
					model: user,
					attributes: ['id', 'name', 'mobile', 'email']
				}
			],
			order: [['created_at', 'DESC']],
			distinct: true,
			duplicating: false,
			limit: 10
		}).then(orders => {
		  if (orders.length > 0) {
			res.status(200).json({
				success: 1,
				message: 'Recent orders list retrive successfully!',
				data: orders
			})
		  } else {
			res.status(200).json({
				success: 0,
				message: 'No Results Found',
				data: []
			})
		  }
		})
	} catch (error) {
		res.status(200).json({
			success: 0,
			message: 'error!'
		})
	}
}

exports.bestSellingProducts = async (req, res) => {
	try {
		var whereClause = []
		whereClause.push({
			status: 'Active'
		})

		productAttributes.push([
			Sequelize.literal(
			  "(select count(order_items.id) from order_items WHERE order_items.product_id = `products`.id)"
			),
			'productOrderCount'
		])
		
		products.findAll({
			attributes: productAttributes,
			include: productIncludes,
		  	where: whereClause,
			order: [[sequelize.col('productOrderCount'), 'desc']],
			limit: 5
		})
		.then(async productsData => {
			let products = await Promise.all(productsData.map(async function(product) {
                let gallery = await product_images.findAll({
					where: {
						product_id: product.id
					}
				})
				product = product.toJSON();
                product.gallery = gallery
				if(product.image!=''){
					product.gallery = [{ image: product.image}, ...gallery]
				}

				let attributes = await product_attributes.findAll({
					attributes: [
						'attribute_id'
					],
					include: [
						{
							model: attributes_model,
							as : "attribute",
							required: false,
							attributes: [
								'id',
								'name',
								'is_color',
								'is_size'
							],
						}
					],
					where: {
						product_id: product.id
					},
					distinct: true,
    				group: ['product_attributes.attribute_id']
				})

				let attributeValuesData = await Promise.all(attributes.map(async function(attribute) {
					let attributeValue = await product_attributes.findAll({
						attributes: [
							'attribute_value_id'
						],
						include: [
							{
								model: attribute_values,
								required: false,
								attributes: [
									'id',
									'attribute_value'
								],
							}
						],
						where: {
							attribute_id: attribute.attribute_id,
							product_id: product.id
						}
					})
					
					attribute = attribute.toJSON();
					attribute.attributes = attributeValue
					return attribute
				}))
				
				product.attributes = attributeValuesData;

                return product;
            }))
			res.status(200).json({ success: 1, message: 'details found!', data: products})
		})
	} catch (error) {
		res.status(200).json({ success: 0, message: 'error!' })
	}
}

exports.weeklyBestSellingProducts = async (req, res) => {
	try {
		var today = moment(new Date())
    	var last7DaysDate = moment(today).add(-7, 'days').format('YYYY-MM-DD')

		orderItems.findAll({
			attributes: [
				'product_id',
				[Sequelize.literal('COUNT(product_id)'), 'productOrderCount'],
				[
					Sequelize.fn('date_format', Sequelize.col('created_at'), '%Y-%m-%d'),
					'created_at'
				]
			],
			include: [
				{
					attributes: [
						'id',
						'name',
						'image'
					],
					model: products,
				},
				{
					model: product_variations_combination,
					required: false,
					attributes: [
						'id',
						'product_id',
						'variant_name',
						'price',
						'quantity',
						'sku'
					],
					include: [
						{
							model: product_variations_values,
							required: false,
							attributes: [
								'product_id',
								'attribute_id',
								'attribute_value_id'
							],
							include: [
								{
									model: attributes_model,
									attributes: ['name']
								},
								{
									model: attribute_values,
									attributes: ['attribute_value']
								}
							]
						}					
					]
				}
			],
			group: 'product_id',
			where: {
				created_at: {
					[Op.gt]: last7DaysDate
				}
			},
			order: [[sequelize.col('productOrderCount'), 'desc']],
			limit: 3
		}).then(recentWeeklyOrders => {
			if (recentWeeklyOrders.length > 0) {
			  res.status(200).json({
				  success: 1,
				  message: 'Products retrive successfully!',
				  data: recentWeeklyOrders
			  })
			} else {
			  res.status(200).json({
				  success: 0,
				  message: 'No Results Found',
				  data: []
			  })
			}
		})
	} catch (error) {
		console.log(error)
		res.status(200).json({ success: 0, message: 'error!' })
	}
}

exports.monthlyBestSellingProducts = async (req, res) => {
	try {
		var today = moment(new Date())
    	var last7DaysDate = moment(today).add(-30, 'days').format('YYYY-MM-DD')

		orderItems.findAll({
			attributes: [
				'product_id',
				[Sequelize.literal('COUNT(product_id)'), 'productOrderCount'],
				[
					Sequelize.fn('date_format', Sequelize.col('created_at'), '%Y-%m-%d'),
					'created_at'
				]
			],
			include: [
				{
					attributes: [
						'id',
						'name',
						'image'
					],
					model: products,
				},
				{
					model: product_variations_combination,
					required: false,
					attributes: [
						'id',
						'product_id',
						'variant_name',
						'price',
						'quantity',
						'sku'
					],
					include: [
						{
							model: product_variations_values,
							required: false,
							attributes: [
								'product_id',
								'attribute_id',
								'attribute_value_id'
							],
							include: [
								{
									model: attributes_model,
									attributes: ['name']
								},
								{
									model: attribute_values,
									attributes: ['attribute_value']
								}
							]
						}					
					]
				}
			],
			group: 'product_id',
			where: {
				created_at: {
					[Op.gt]: last7DaysDate
				}
			},
			order: [[sequelize.col('productOrderCount'), 'desc']],
			limit: 3
		}).then(recentWeeklyOrders => {
			if (recentWeeklyOrders.length > 0) {
			  res.status(200).json({
				  success: 1,
				  message: 'Products retrive successfully!',
				  data: recentWeeklyOrders
			  })
			} else {
			  res.status(200).json({
				  success: 0,
				  message: 'No Results Found',
				  data: []
			  })
			}
		})
	} catch (error) {
		console.log(error)
		res.status(200).json({ success: 0, message: 'error!' })
	}
}

exports.ordersTimeLine = async (req, res) => {
	try {
		var today = moment(new Date())
    	var lastDaysDate = moment(today).add(-30, 'days').format('YYYY-MM-DD')

		orders.findAll({
			attributes: [
				[Sequelize.literal('COUNT(id)'), 'orderCount'],
				[
					Sequelize.fn('date_format', Sequelize.col('order_date'), '%Y-%m-%d'),
					'order_date'
				]
			],
			group: 'order_date',
			where: {
				order_date: {
					[Op.gt]: lastDaysDate
				}
			},
			order: [['order_date', 'asc']]
		}).then(last30daysorders => {
			if (last30daysorders.length > 0) {
			  res.status(200).json({
				  success: 1,
				  message: 'Results',
				  data: last30daysorders
			  })
			} else {
			  res.status(200).json({
				  success: 0,
				  message: 'No Results Found',
				  data: []
			  })
			}
		})
	} catch (error) {
		console.log(error)
		res.status(200).json({ success: 0, message: 'error!' })
	}
}

exports.totalOrder = async (req, res) => {
	try {
		
		orders.findOne({
			attributes: [
				[Sequelize.literal('COUNT(id)'), 'orderCount'],
				[Sequelize.literal('SUM(total)'), 'orderTotal'],
				[Sequelize.literal('AVG(total)'), 'orderAvg'],
				[
					Sequelize.literal(
					  '(select count(total) from orders WHERE orders.currency != "INR" AND orders.order_status!="Canceled")'
					),
					'overseasOrderCount'
				],
				[
					Sequelize.literal(
					  '(select sum(total) from orders WHERE orders.currency != "INR" AND orders.order_status!="Canceled")'
					),
					'overseasOrder'
				],
				[
					Sequelize.literal(
					  '(select count(total) from orders WHERE orders.currency = "INR" AND orders.order_status!="Canceled")'
					),
					'domesticOrderCount'
				],
				[
					Sequelize.literal(
					  '(select sum(total) from orders WHERE orders.currency = "INR" AND orders.order_status!="Canceled")'
					),
					'domesticOrder'
				],
			],
			where:{ 
				[Op.and]: [
					{
						order_status: {
							[Op.ne]: 'Canceled'
						}
					},
					{
						is_deleted: {
							[Op.eq]: 'No'
						}
					}
				]
			}
		}).then(orders => {
			res.status(200).json({
				success: 1,
				message: 'Results',
				data: orders
			})
		})
	} catch (error) {
		console.log(error)
		res.status(200).json({ success: 0, message: 'error!' })
	}
}
