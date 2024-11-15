// const SurveyQuestion = require('../models/Surveyquestion'); // Import the model


// exports.createSurveyQuestion = async (req, res) => {
//     try {
//         const { title, description, dimension, year, imageUrl, answerOptions } = req.body;


//         const newQuestion = new SurveyQuestion({
//             title,
//             description,
//             dimension,
//             year,
//             imageUrl,
//             answerOptions,
//         });

//         const savedQuestion = await newQuestion.save();
//         res.status(200).json(savedQuestion);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // Get all survey questions
// exports.getAllQuestions = async (req, res) => {
//     try {
//         const userRole = req.user ? req.user.role : 'user';
//         let questions;

//         if (userRole === 'admin') {
//             questions = await SurveyQuestion.find().select('title description dimension year imageUrl timer liveScoreboard');
//         } else {
//             questions = await SurveyQuestion.find().select('title imageUrl answerOptions.optionText timer');
//         }

//         // Access the socket.io instance from the Express app
//         const io = req.app.get('socketio');
        
//         // Emit the event with the questions data
//         io.emit('allQuestionsFetched', { questions });

//         // Send the response back to the client
//         res.status(200).json(questions);

//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // Get a specific survey question by ID
// exports.getQuestionById = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const userRole = req.user ? req.user.role : 'user';
//         const baseUrl = `${req.protocol}://${req.get('host')}/upload/`;

//         let question;
//         if (userRole === 'admin') {
//             question = await SurveyQuestion.findById(id)
//                 .select('title description dimension year imageUrl timer liveScoreboard')
//                 .populate('imageUrl', 'path'); // Populate path field from Media model
//         } else {
//             question = await SurveyQuestion.findById(id)
//                 .select('title imageUrl answerOptions.optionText timer')
//                 .populate('imageUrl', 'path'); // Populate path field from Media model
//         }

//         if (!question) {
//             return res.status(404).json({ message: 'Survey question not found' });
//         }

//         // Construct the full URL for imageUrl if it's populated
//         if (question.imageUrl && question.imageUrl.path) {
//             question.imageUrl = `${baseUrl}${question.imageUrl.path.split('\\').pop()}`;
//         }

//         // Access the socket.io instance from the Express app
//         const io = req.app.get('socketio');
        
//         // Emit the event with the fetched question data
//         io.emit('questionFetchedById', { question });

//         // Send the response back to the client
//         res.status(200).json(question);

//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// exports.getNextQuestionSocket = async (questionId, io, qrCodeData) => {
//     try {
//       const question = await SurveyQuestion.findById(questionId);
//       if (question) {
//         // Emit the question to both admin and users in the room identified by qrCodeData
//         io.to(qrCodeData).emit('new_question', {
//           question,
//           timer: 30 // Initial timer value (can adjust as needed)
//         });
  
//         // Start a countdown timer for the question
//         let countdown = 30; // 30 seconds timer
//         const timerInterval = setInterval(() => {
//           countdown--;
//           io.to(qrCodeData).emit('timer_update', { countdown });
  
//           if (countdown <= 0) {
//             clearInterval(timerInterval);
//           }
//         }, 1000); // Update timer every second
//       } else {
//         console.error('Survey question not found');
//       }
//     } catch (error) {
//       console.error('Error sending survey question:', error);
//     }
// };




const SurveyQuestion = require('../models/Surveyquestion');

// Store active QR sessions
const activeQrSessions = new Map();

// Helper function to construct image URL
const constructImageUrl = (baseUrl, imageUrl) => {
    if (!imageUrl || !imageUrl.path) {
        return null;
    }
    try {
        // Handle both Windows and Unix-style paths
        const filename = imageUrl.path.split(/[/\\]/).pop();
        return `${baseUrl}${filename}`;
    } catch (error) {
        console.error('Error constructing image URL:', error);
        return null;
    }
};

// Helper function to process question object
const processQuestionObject = (question, baseUrl) => {
    if (!question) return null;
    
    const questionObj = question.toObject();
    questionObj.imageUrl = constructImageUrl(baseUrl, questionObj.imageUrl);
    return questionObj;
};

// Get all public questions
exports.getPublicQuestions = async (req, res) => {
    try {
        const baseUrl = `${req.protocol}://${req.get('host')}/uploads/`;
        
        const questions = await SurveyQuestion.find()
            .select('title imageUrl answerOptions.optionText timer')
            .populate('imageUrl', 'path')
            .lean();  // Use lean() for better performance
        
        if (!questions || !Array.isArray(questions)) {
            return res.status(404).json({ message: 'No questions found' });
        }

        const questionsWithImageUrls = questions.map(question => 
            processQuestionObject(question, baseUrl)
        ).filter(Boolean);  // Remove any null results
        
        res.status(200).json(questionsWithImageUrls);
    } catch (error) {
        console.error('Error in getPublicQuestions:', error);
        res.status(500).json({ 
            message: 'Failed to fetch questions',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Get public question by ID
exports.getPublicQuestionById = async (req, res) => {
    try {
        const baseUrl = `${req.protocol}://${req.get('host')}/uploads/`;
        
        const question = await SurveyQuestion.findById(req.params.id)
            .select('title imageUrl answerOptions.optionText timer')
            .populate('imageUrl', 'path')
            .lean();
            
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        const processedQuestion = processQuestionObject(question, baseUrl);
        if (!processedQuestion) {
            return res.status(404).json({ message: 'Error processing question data' });
        }

        res.status(200).json(processedQuestion);
    } catch (error) {
        console.error('Error in getPublicQuestionById:', error);
        res.status(500).json({ 
            message: 'Failed to fetch question',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Get all admin questions
exports.getAdminQuestions = async (req, res) => {
    try {
        const baseUrl = `${req.protocol}://${req.get('host')}/uploads/`;
        
        const questions = await SurveyQuestion.find()
            .select('title description dimension year imageUrl timer liveScoreboard')
            .populate('imageUrl', 'path')
            .lean();

        if (!questions || !Array.isArray(questions)) {
            return res.status(404).json({ message: 'No questions found' });
        }

        const questionsWithImageUrls = questions.map(question => 
            processQuestionObject(question, baseUrl)
        ).filter(Boolean);

        res.status(200).json(questionsWithImageUrls);
    } catch (error) {
        console.error('Error in getAdminQuestions:', error);
        res.status(500).json({ 
            message: 'Failed to fetch admin questions',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Create new question
exports.createSurveyQuestion = async (req, res) => {
    try {
        const { title, description, dimension, year, imageUrl, answerOptions, timer } = req.body;
        
        // Validate required fields
        if (!title || !answerOptions || !Array.isArray(answerOptions)) {
            return res.status(400).json({ 
                message: 'Missing required fields: title and answerOptions array' 
            });
        }

        const newQuestion = new SurveyQuestion({
            title,
            description,
            dimension,
            year,
            imageUrl,
            answerOptions,
            timer: timer || 30
        });

        const savedQuestion = await newQuestion.save();
        
        // Populate imageUrl after saving
        await savedQuestion.populate('imageUrl', 'path');
        
        const baseUrl = `${req.protocol}://${req.get('host')}/uploads/`;
        const processedQuestion = processQuestionObject(savedQuestion, baseUrl);

        res.status(201).json(processedQuestion);
    } catch (error) {
        console.error('Error in createSurveyQuestion:', error);
        res.status(500).json({ 
            message: 'Failed to create question',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

exports.getAdminQuestionById = async (req, res) => {
    try {
        const baseUrl = `${req.protocol}://${req.get('host')}/uploads/`;
        
        const question = await SurveyQuestion.findById(req.params.id)
            .select('title description dimension year imageUrl timer liveScoreboard')
            .populate('imageUrl', 'path')
            .lean();
            
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        const processedQuestion = processQuestionObject(question, baseUrl);
        if (!processedQuestion) {
            return res.status(404).json({ message: 'Error processing question data' });
        }

        res.status(200).json(processedQuestion);
    } catch (error) {
        console.error('Error in getAdminQuestionById:', error);
        res.status(500).json({ 
            message: 'Failed to fetch question',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Initialize QR session
exports.initializeQrSession = async (req, res) => {
    try {
        const { qrCodeId } = req.params;
        const io = req.app.get('socketio');

        if (!activeQrSessions.has(qrCodeId)) {
            activeQrSessions.set(qrCodeId, {
                currentQuestionId: null,
                timer: null
            });
            
            io.on('connection', (socket) => {
                socket.join(qrCodeId);
                socket.emit('session_initialized', { qrCodeId });
            });
        }

        res.status(200).json({ message: 'Session initialized', qrCodeId });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get current question by QR code
exports.getCurrentQuestionByQr = async (req, res) => {
    try {
        const { qrCodeId } = req.params;
        const session = activeQrSessions.get(qrCodeId);
        const baseUrl = `${req.protocol}://${req.get('host')}/uploads/`;

        if (!session || !session.currentQuestionId) {
            return res.status(404).json({ message: 'No active question for this session' });
        }

        const question = await SurveyQuestion.findById(session.currentQuestionId)
            .select('title imageUrl answerOptions.optionText timer')
            .populate('imageUrl', 'path');

        const questionObj = question.toObject();
        if (questionObj.imageUrl && questionObj.imageUrl.path) {
            questionObj.imageUrl = `${baseUrl}${questionObj.imageUrl.path.split('\\').pop()}`;
        }

        res.status(200).json(questionObj);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Change question for QR session
exports.changeQuestionByQr = async (req, res) => {
    try {
        const { qrCodeId, questionId } = req.params;
        const io = req.app.get('socketio');
        const baseUrl = `${req.protocol}://${req.get('host')}/uploads/`;

        const question = await SurveyQuestion.findById(questionId)
            .select('title description dimension year imageUrl timer liveScoreboard')
            .populate('imageUrl', 'path');

        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        const questionObj = question.toObject();
        if (questionObj.imageUrl && questionObj.imageUrl.path) {
            questionObj.imageUrl = `${baseUrl}${questionObj.imageUrl.path.split('\\').pop()}`;
        }

        let session = activeQrSessions.get(qrCodeId);
        if (!session) {
            session = { currentQuestionId: null, timer: null };
            activeQrSessions.set(qrCodeId, session);
        }

        if (session.timer) {
            clearInterval(session.timer);
        }

        session.currentQuestionId = questionId;

        let countdown = questionObj.timer || 30;
        session.timer = setInterval(() => {
            countdown--;
            io.to(qrCodeId).emit('timer_update', { countdown });

            if (countdown <= 0) {
                clearInterval(session.timer);
                io.to(qrCodeId).emit('question_timeout');
            }
        }, 1000);

        io.to(qrCodeId).emit('question_changed', { question: questionObj });

        res.status(200).json({ message: 'Question changed successfully', question: questionObj });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// End QR session
exports.endQrSession = async (req, res) => {
    try {
        const { qrCodeId } = req.params;
        const io = req.app.get('socketio');
        
        const session = activeQrSessions.get(qrCodeId);
        if (session && session.timer) {
            clearInterval(session.timer);
        }
        
        activeQrSessions.delete(qrCodeId);
        io.to(qrCodeId).emit('session_ended');
        
        res.status(200).json({ message: 'Session ended successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};