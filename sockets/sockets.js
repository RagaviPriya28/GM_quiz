const Session = require('../models/session');
const Question = require('../models/question');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('New client connected:');

    socket.on('join_session', async (sessionId, userId) => {
      const session = await Session.findById(sessionId);
      if (session) {
        socket.join(sessionId);
        socket.to(sessionId).emit('user_joined', { userId });
      }
    });

    socket.on('start_quiz', async (sessionId) => {
      const session = await Session.findById(sessionId).populate('quiz');
      if (session) {
        session.status = 'in_progress';
        await session.save();
        io.in(sessionId).emit('quiz_started', { quizId: session.quiz._id });
      }
    });

    socket.on('next_question', async (sessionId, questionId) => {
      const question = await Question.findById(questionId);
      if (question) {
        io.in(sessionId).emit('new_question', question);
      }
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:');
    });
  });
};
