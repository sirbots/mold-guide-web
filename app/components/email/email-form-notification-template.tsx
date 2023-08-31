import * as React from 'react';

interface EmailTemplateProps {
  // firstName: string;
  emailMessage: string;
}

export const EmailFormNotificationTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  // firstName,
  emailMessage,
}) => (
  <div>
    <h1>A new form was submitted!</h1>
    <p>Submitted form: {emailMessage}</p>
  </div>
);
