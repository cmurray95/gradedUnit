const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs'); // File system
const {schema} = mongoose; // Database schema
const multer = requier('multer'); // Image handler

let image = new imageSchema ({
  img:
  {
    // Buffer type stores images as array
    data: Buffer, contentType: String
  }
});

let image = mongoose.model('images', imageSchema);