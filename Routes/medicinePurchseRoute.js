const express=require('express');
const purchaseContoller=require('./../Controllers/medicinePurchaseController')
const Router=express.Router({mergeParams:true})
Router.route('/')
.post(purchaseContoller.getMedicineId,purchaseContoller.purchaseMedicine)
.get(purchaseContoller.populatePuchase)
module.exports=Router