import * as React from 'react';

interface EmailTemplateProps {
  email: string;
  feedbackMessage: string;
}

export const FeedbackFormNotification: React.FC<Readonly<EmailTemplateProps>> = ({
  email,
  feedbackMessage
}) => (
  <div>
    <h1>Feedback form submitted!</h1>
    
    <p>Sent by: {email}</p>
    <p>Feedback:</p>
    <p>{feedbackMessage}</p>
  </div>
);
