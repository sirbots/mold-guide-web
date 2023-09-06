import * as React from 'react';

interface EmailTemplateProps {
  formSubmitted: string;
}

export const ContentSubmissionNotification: React.FC<Readonly<EmailTemplateProps>> = ({
  formSubmitted
}) => (
  <div>
    <h1>New content was submitted to the site</h1>
    <p>Submitted form: {formSubmitted}</p>
    
  </div>
);
