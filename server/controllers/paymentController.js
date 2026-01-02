const fs = require('fs');
const path = require('path');
console.log('DEBUG: payment controller __dirname', __dirname);
try {
  console.log('DEBUG: models list', fs.readdirSync(path.resolve(__dirname, '../models')));
  console.log('DEBUG: payment exists', fs.existsSync(path.resolve(__dirname, '../models/payment.js')));
} catch (e) {
  console.log('DEBUG: models list error', e.message);
}

const Payment = require("../models/Payment");

// CREATE PAYMENT
exports.createPayment = async (req, res) => {
  try {
    const payment = new Payment(req.body);
    const savedPayment = await payment.save();
    res.status(201).json(savedPayment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET ALL PAYMENTS
exports.getPayments = async (req, res) => {
  try {
    const payments = await Payment.find().sort({ createdAt: -1 });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE PAYMENT
exports.updatePayment = async (req, res) => {
  try {
    const updated = await Payment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
