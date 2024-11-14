const Session = require('../models/session');
const Question = require('../models/question');
const surveyQuestionController = require('../controllers/surveyQuestionController');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    // Handle user joining a session's lobby
    socket.on('join_session', async ({ sessionId, userId }) => {
      try {
        const session = await Session.findById(sessionId);
        if (session) {
          session.players.push(userId);
          await session.save();

          // Join the user to the session room in socket
          socket.join(sessionId);

          // Notify all players in the session room
          io.to(sessionId).emit('user_joined_lobby', { userId });
        } else {
          socket.emit('error', 'Session not found');
        }
      } catch (error) {
        console.error('Error joining session:', error);
        socket.emit('error', 'Error joining session');
      }
    });

    socket.on('start_quiz', async (sessionId) => {
      try {
        const session = await Session.findById(sessionId).populate('quiz');
        if (session) {
          session.status = 'in_progress';
          await session.save();

          // Notify all users in the lobby that the quiz has started
          io.to(sessionId).emit('quiz_started', { quizId: session.quiz._id });
        } else {
          socket.emit('error', 'Session not found');
        }
      } catch (error) {
        console.error('Error starting quiz:', error);
        socket.emit('error', 'Error starting quiz');
      }
    });

    // socket.on('next_question', async ({ sessionId, questionId }) => {
    //   try {
    //     const question = await Question.findById(questionId);
    //     if (question) {
    //       io.to(sessionId).emit('new_question', question);
    //     } else {
    //       socket.emit('error', 'Question not found');
    //     }
    //   } catch (error) {
    //     console.error('Error sending question:', error);
    //     socket.emit('error', 'Error sending question');
    //   }
    // });

    socket.on('next_question', async ({ sessionId, questionId }) => {
      await surveyQuestionController.getNextQuestionSocket(questionId, io, sessionId);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:');
    });
  });
};



module.exports = function(io) {
  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('disconnect', () => {
      console.log('A user disconnected:', socket.id);
    });

    // Add custom event handlers if needed, for example:
    socket.on('someClientEvent', (data) => {
      console.log('Received data from client:', data);
      // Handle event
    });
  });
};
