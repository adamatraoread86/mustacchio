const ContactRequest = require("../models/ContactRequest");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");



const transporter = nodemailer.createTransport(sendgridTransport({
  auth: {
    APIKEY: process.env.APIKEY
  }
}));


exports.getContact = (req, res, next) => {
  res.render("contact", { pageTitle: "Contact", path: "/contacts/new" });
};

exports.getContactList = async (req, res, next) => {
  try {
    const contacts = await ContactRequest.find({dateResponded: null});
    res.render("contact-list", {
      pageTitle: "Contact List",
      contacts,
      path: "/contacts",
    });
  } catch (e) {
    console.log("error: ", e);
  }
};

exports.createContact = async (req, res, next) => {
  try {
    //Retrieve the date from contact form
    const { name, email, message, phone, address } = req.body;
    await ContactRequest.create({
      name,
      email,
      message,
      phone,
      address,
    });
    res.render("thanks", { pageTitle: "Thank You!", path: "/contacts/new" });
    return transporter.sendMail({
      to: email,
      from: process.env.FROM_EMAIL,
      subject: "Contact successfully created!",
      html: "<h1>You successfully created your contact!</h1>"
    }) 
  } catch (e) {
    console.log("error: ", e);
  }
};

exports.getEditContact = async (req, res, next) => {
  const { id } = req.params;
  try {
    const contact = await ContactRequest.findById(id);
    res.render("contact-respond", {
      pageTitle: `${contact.name} - edit`,
      contact,
      path: req.baseUrl,
    });
  } catch (e) {
    console.log("error: ", e);
  }
};

exports.editContact = async (req, res, next) => {
  const { id } = req.params;
  const { response } = req.body;
  try {
    const contact = await ContactRequest.findById(id);
    contact.response = response;
    contact.dateResponded = new Date();
    await contact.save();
    res.render("contact-respond", {
      pageTitle: `${contact.name} - edit`,
      contact,
      path: req.baseUrl,
    });
  } catch (e) {
    console.log("error: ", e);
  }
};

