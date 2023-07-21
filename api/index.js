const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { v4: uuidv4, parse: uuidParse } = require('uuid'); // Update the import statement

const { hash } = require('uuid'); // Import the hash function

const app = express();

app.use(express.json());
const port = process.env.PORT || 3000;

app.use(cors({
  // Add the allowed methods for your frontend requests
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// MongoDB connection
const mongoURI = 'mongodb+srv://sgouduk2023:fhnRgACtxnHJDfJK@cluster0.elplbae.mongodb.net/Universities?retryWrites=true&w=majority';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error.message);
});

const universitySchema = new mongoose.Schema({
  name: String,
  address: String,
  country: String,
  region: String,
  id: String,
});

const Institutions = mongoose.model('institutions', universitySchema);

const subjectSchema = new mongoose.Schema({
  name: String,
  academic_papers: Number,
  students_total: Number,
  student_rating: Number,
});

const submissionSchema = new mongoose.Schema({
  _id: String, // Use the _id field as a String type
  institutionId: {
    type: String, // Change the type to String to support UUID
    required: true,
  },
  year: Number,
  students_total: Number,
  undergraduates_total: Number,
  postgraduates_total: Number,
  staff_total: Number,
  academic_papers: Number,
  institution_income: Number,
  subjects: [subjectSchema],
});


const Submissions = mongoose.model('submissions', submissionSchema);


// Endpoint to get all institutions
app.get('/institutions', async (req, res) => {
  try {
    const institutions = await Institutions.find({}).select('-__v');
    console.log('Institutions:', institutions); // Add this line to check the fetched data
    res.json(institutions);
  } catch (error) {
    console.error('Error retrieving institutions:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to insert a new institution into the database
app.post('/institutions', async (req, res) => {
  try {
    // Extract the institution data from the request body
    const { name, address, country, region } = req.body;

    const id = uuidv4();

    // Create a new institution object using the Institutions model
    const newInstitution = new Institutions({
      name,
      address,
      country,
      region,
      id,
    });

    // Save the new institution object to the database
    const savedInstitution = await newInstitution.save();

    // Respond with the saved institution object
    res.json(savedInstitution);
  } catch (error) {
    console.error('Error saving institution:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to post new submissions
// Endpoint to post new submissions
app.post('/submissions', async (req, res) => {
  try {
    // Extract the submission data from the request body
    const {
      institution_id,
      year,
      students_total,
      undergraduates_total,
      postgraduates_total,
      staff_total,
      academic_papers,
      institution_income,
      subjects,
    } = req.body;

    // Generate a new UUID in version 4 format for the submission
    const id = uuidv4();

    // Create a new submission object using the Submissions model
    const newSubmission = new Submissions({
      _id: id, // Use the UUID as the _id for the submission
      institutionId: institution_id,
      year,
      students_total,
      undergraduates_total,
      postgraduates_total,
      staff_total,
      academic_papers,
      institution_income,
      subjects,
    });

    // Save the new submission object to the database
    const savedSubmission = await newSubmission.save();

    // Respond with the saved submission object
    res.json(savedSubmission);
  } catch (error) {
    console.error('Error saving submission:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to get all submissions
app.get('/submissions', async (req, res) => {
  try {
    // Retrieve all submissions from the database
    const submissions = await Submissions.find({}).select('-__v');

    // Respond with the fetched submissions
    res.json(submissions);
  } catch (error) {
    console.error('Error retrieving submissions:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to get a single submission by institutionId
app.get('/submissions/:institutionId', async (req, res) => {
  try {
    const { institutionId } = req.params;
    const submission = await Submissions.findOne({ institutionId }).select('-__v');

    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }

    res.json(submission);
  } catch (error) {
    console.error('Error retrieving submission:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});



app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});

