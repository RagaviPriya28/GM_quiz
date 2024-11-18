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
const AnswerSubmission = require('../models/AnswerSubmission'); 
const User = require('../models/newUser');
const AnswerCounts = require('../models/AnswerCounts');

// Store active QR sessions
const activeQrSessions = new Map();

// Get all public questions
exports.getPublicQuestions = async (req, res) => {
    try {
        const questions = await SurveyQuestion.find()
            .select('title imageUrl answerOptions.optionText timer');
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get public question by ID
exports.getPublicQuestionById = async (req, res) => {
    try {
        const question = await SurveyQuestion.findById(req.params.id)
            .select('title imageUrl answerOptions.optionText timer');
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }
        res.status(200).json(question);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all admin questions
exports.getAdminQuestions = async (req, res) => {
    try {
        const questions = await SurveyQuestion.find()
            .select('title description dimension year imageUrl timer liveScoreboard');
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get admin question by ID
exports.getAdminQuestionById = async (req, res) => {
    try {
        const question = await SurveyQuestion.findById(req.params.id)
            .select('title description dimension year imageUrl timer liveScoreboard');
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }
        res.status(200).json(question);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create new question
exports.createSurveyQuestion = async (req, res) => {
    try {
        const { title, description, dimension, year, imageUrl, answerOptions, timer } = req.body;
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
        res.status(201).json(savedQuestion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Initialize QR session
exports.initializeQrSession = async (req, res) => {
    try {
        const { qrCodeId } = req.params;
        const io = req.app.get('socketio');

        // Initialize session if it doesn't exist
        if (!activeQrSessions.has(qrCodeId)) {
            activeQrSessions.set(qrCodeId, {
                currentQuestionId: null,
                timer: null
            });
            
            // Create socket room for this QR code
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

exports.submitAnswer = async (req, res) => {
    try {
        const { qrCodeId, questionId, userId } = req.params;
        const { answerText, timeTaken } = req.body;

        // Validate input
        if (!answerText) {
            return res.status(400).json({ message: 'Answer text is required' });
        }
        if (typeof timeTaken !== 'number' || timeTaken < 0) {
            return res.status(400).json({ message: 'Valid timeTaken value is required' });
        }

        // Check if the user has already submitted an answer for this question
        const existingSubmission = await AnswerSubmission.findOne({ userId, questionId });
        if (existingSubmission) {
            return res.status(400).json({ message: 'You have already submitted an answer for this question' });
        }

        // Fetch the question
        const question = await SurveyQuestion.findById(questionId).select('answerOptions');

        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        // Validate the answer
        const isValidAnswer = question.answerOptions.some(option => option.optionText === answerText);

        if (!isValidAnswer) {
            return res.status(400).json({ message: 'Invalid answer option' });
        }

        // Save the submission with time taken
        const submission = new AnswerSubmission({
            userId: userId,
            questionId: questionId,
            qrCodeId: qrCodeId,
            submittedAnswer: answerText,
            submittedAt: new Date(),
            timeTaken: timeTaken // Storing the time taken for submission
        });

        await submission.save();

        // Fetch user details
        const user = await User.findById(userId).select('userName phoneNumber email');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Send the response
        res.status(200).json({
            message: 'Answer submitted successfully',
            data: {
                questionId: questionId,
                qrCodeId: qrCodeId,
                userId: userId,
                userName: user.userName,
                phoneNumber: user.phoneNumber,
                email: user.email,
                timeTaken: timeTaken
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getAnswerCountsWithUserDetails = async (req, res) => {
    try {
        const { qrCodeId, questionId } = req.params;

        // Fetch the question to get available options
        const question = await SurveyQuestion.findById(questionId).select('answerOptions');
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        // Count submissions and gather user details for each answer option
        const submissions = await AnswerSubmission.find({ questionId: questionId, qrCodeId: qrCodeId })
            .populate('userId', 'userName phoneNumber email');

        // Prepare the response with counts and user details
        const response = {};
        question.answerOptions.forEach(option => {
            // Filter submissions for the current option
            const optionSubmissions = submissions.filter(sub => sub.submittedAnswer === option.optionText);
            
            // Count the number of submissions for this option
            response[option.optionText] = {
                count: optionSubmissions.length,
                users: optionSubmissions.map(sub => ({
                    userId: sub.userId._id,
                    userName: sub.userId.userName,
                    phoneNumber: sub.userId.phoneNumber,
                    email: sub.userId.email,
                    submittedAt: sub.submittedAt,
                    timeTaken: sub.timeTaken
                }))
            };
        });

        res.status(200).json({
            message: 'Counts and user details retrieved successfully',
            questionId: questionId,
            qrCodeId: qrCodeId,
            data: response
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAnswerCountsWithUserDetails = async (req, res) => {
    try {
        const { qrCodeId, questionId } = req.params;

        // Fetch the question to get available options
        const question = await SurveyQuestion.findById(questionId).select('answerOptions');
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        // Count submissions and gather user details for each answer option
        const submissions = await AnswerSubmission.find({ questionId: questionId, qrCodeId: qrCodeId })
            .populate('userId', 'userName phoneNumber email');

        // Prepare the response with counts and user details
        const response = {};
        const countsData = [];
        question.answerOptions.forEach(option => {
            // Filter submissions for the current option
            const optionSubmissions = submissions.filter(sub => sub.submittedAnswer === option.optionText);
            
            // Count the number of submissions for this option
            const count = optionSubmissions.length;
            response[option.optionText] = {
                count: count,
                users: optionSubmissions.map(sub => ({
                    userId: sub.userId._id,
                    userName: sub.userId.userName,
                    phoneNumber: sub.userId.phoneNumber,
                    email: sub.userId.email,
                    submittedAt: sub.submittedAt,
                    timeTaken: sub.timeTaken
                }))
            };

            // Prepare data for saving counts
            countsData.push({ optionText: option.optionText, count: count });
        });

        // Save counts data to the database
        const existingCounts = await AnswerCounts.findOne({ qrCodeId: qrCodeId, questionId: questionId });
        if (existingCounts) {
            // If counts already exist, update them
            existingCounts.counts = countsData;
            await existingCounts.save();
        } else {
            // If counts do not exist, create a new record
            const newCounts = new AnswerCounts({
                qrCodeId: qrCodeId,
                questionId: questionId,
                counts: countsData
            });
            await newCounts.save();
        }

        res.status(200).json({
            message: 'Counts and user details retrieved successfully',
            questionId: questionId,
            qrCodeId: qrCodeId,
            data: response
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getTotalCountsForAllQuestions = async (req, res) => {
    try {
        const { qrCodeData } = req.params; // Get qrCodeData from URL parameters

        // Fetch all questions
        const questions = await SurveyQuestion.find().select('answerOptions');

        // Prepare an object to store counts for all questions
        const totalCountsResponse = {};

        // Variable to track if any data is found for the given qrCodeData
        let isDataFound = false;

        for (let question of questions) {
            // Find all submissions for the current question and qrCodeData
            const submissions = await AnswerSubmission.find({ questionId: question._id, qrCodeId: qrCodeData })
                .populate('userId', 'userName phoneNumber email');

            // If there are submissions for this question and qrCodeData, process the data
            if (submissions.length > 0) {
                isDataFound = true;
                const response = {};
                const countsData = [];
                question.answerOptions.forEach(option => {
                    // Filter submissions for the current option
                    const optionSubmissions = submissions.filter(sub => sub.submittedAnswer === option.optionText);

                    // Count the number of submissions for this option
                    const count = optionSubmissions.length;
                    response[option.optionText] = {
                        count: count,
                        users: optionSubmissions.map(sub => ({
                            userId: sub.userId._id,
                            userName: sub.userId.userName,
                            phoneNumber: sub.userId.phoneNumber,
                            email: sub.userId.email,
                            submittedAt: sub.submittedAt,
                            timeTaken: sub.timeTaken
                        }))
                    };

                    // Prepare data for saving counts
                    countsData.push({ optionText: option.optionText, count: count });
                });

                // Save counts to the database for this question (update or create)
                const existingCounts = await AnswerCounts.findOne({ questionId: question._id, qrCodeId: qrCodeData });
                if (existingCounts) {
                    existingCounts.counts = countsData;
                    await existingCounts.save();
                } else {
                    const newCounts = new AnswerCounts({
                        qrCodeId: qrCodeData,
                        questionId: question._id,
                        counts: countsData
                    });
                    await newCounts.save();
                }

                // Add the response data for the current question
                totalCountsResponse[question._id] = {
                    questionId: question._id,
                    counts: response
                };
            }
        }

        // If no data is found for the given qrCodeData, send a response indicating no data found
        if (!isDataFound) {
            return res.status(404).json({
                message: `No data found for the QR code: ${qrCodeData}`
            });
        }

        // Send the response with counts for all questions
        res.status(200).json({
            message: 'Total counts for all questions retrieved successfully',
            data: totalCountsResponse
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
