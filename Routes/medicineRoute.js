const express=require('express');
const medicineController=require('./../Controllers/medicineController')
const medicineRouter=require('./medicinePurchseRoute')
const Router=express.Router();
Router.use('/:id/purchaseMedicine',medicineRouter)
Router.route('/').post(medicineController.createMedicine).get(medicineController.getAllMedicines)
Router.route('/:id').get(medicineController.getMedicine).delete(medicineController.deleteMedicine).patch(medicineController.updateMedicine)
module.exports=Router