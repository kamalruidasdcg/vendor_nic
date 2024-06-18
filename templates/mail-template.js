
const EMAIL_TEMPLAE = (text, link = "") => {
  return `<!DOCTYPE html>
  <html>
  
  <head>
      <meta charset="utf-8">
      <title>E-Mail OBPS Project</title>
      <style>
          .container {
              width: 100%;
              height: 100%;
              padding: 20px;
              background-color: #f4f4f4;
          }
  
          .email {
              width: 80%;
              margin: 0 auto;
              background-color: #fff;
              padding: 0 20px 0 20px;
          }
  
          .email-header {
              background-color: #333;
              color: #fff;
              padding: 10px;
              text-align: center;
          }
  
          .email-body {
              padding: 10px 5px;
          }
  
          .email-footer {
              padding: 5px;
              text-align: left;
          }
  
          .link-details {
              padding: 5px;
              margin-top: 50px;
          }
      </style>
  </head>
  
  <body>
      <div class="container">
          <div class="email">
              <div class="email-body">
                  <p>Dear Sir/Madam</p>
                  <p> <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>${text}</p>
                  <!-- <p class="link-details"><span>Please click <a href="https://google.com">here</a> to open the
                          documnet</span></p> -->
              </div>
              <div class="email-footer">
                  <p> Thanks &amp; Regards, </p>
                  <p> Support team </p>
                  <p>Note: This is system generated mail, kindly don't reply</p>
              </div>
          </div>
      </div>
  </body>
  
  </html>`;
};


module.exports = { EMAIL_TEMPLAE };
