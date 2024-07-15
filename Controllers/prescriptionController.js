const Prescription = require('./../Model/medicinePrescriptionModel');

exports.createPrescription = async (req, res, next) => {
    try {
        const prescriptions = await Prescription.create(req.body);
        if (!prescriptions) {
            return res.status(400).json({
                status: 'failed',
                message: 'Error while creating prescription'
            });
        }
        res.status(201).json({
            status: 'success',
            message: 'Prescription created successfully',
            data: prescriptions
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: 'failed',
            message: err.message
        });
    }
};

exports.getPrescription = async (req, res, next) => {
    try {
        const { patientCnic } = req.query; // Extract patientCnic from the query parameters

        if (!patientCnic) {
            return res.status(400).json({
                status: 'failed',
                message: 'patientCnic is required'
            });
        }

        const prescription = await Prescription.findOne({ patientCnic });

        if (!prescription) {
            return res.status(404).json({
                status: 'failed',
                message: 'Prescription not found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: prescription
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: 'failed',
            message: err.message
        });
    }
};
