const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs'); // File system
const {schema} = mongoose; // Database schema
const multer = requier('multer'); // Image handler

// Set app to use multer image handler