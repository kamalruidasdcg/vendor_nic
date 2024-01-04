const HTML_TEMPLATE = (text) => {
  return `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>E-Mail from GRSE Bill Traking System Project</title>
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
                padding: 20px;
              }
              .email-header {
                background-color: #333;
                color: #fff;
                padding: 20px;
                text-align: center;
              }
              .email-body {
                padding: 20px;
              }
              .email-footer {
                background-color: #333;
                color: #fff;
                padding: 20px;
                text-align: center;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="email">
                <div class="email-header">
                  <h1>Vendor Bill Registration</h1>
                </div>
                <div class="email-body">
                  <p>${text}</p>
                </div>
                <div class="email-footer">
                  <p>Don't reply to this mail.</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `;
};
const VENDOR_MAIL_TEMPLATE = (text, heading) => {
  return `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>E-Mail from GRSE Bill Traking System Project</title>
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
                padding: 20px;
              }
              .email-header {
                background-color: #333;
                color: #fff;
                padding: 20px;
                text-align: center;
              }
              .email-body {
                padding: 20px;
              }
              .email-footer {
                background-color: #333;
                color: #fff;
                padding: 20px;
                text-align: center;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="email">
                <div class="email-header">
                  <h1>${heading}</h1>
                </div>
                <div class="email-body">
                  <p>${text}</p>
                </div>
                <div class="email-footer">
                  <p>Don't reply to this mail.</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `;
};


const OFFICERS_MAIL_TEMPLATE = (text, heading) => {
  return `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>E-Mail from GRSE Bill Traking System Project</title>
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
                padding: 20px;
              }
              .email-header {
                background-color: #333;
                color: #fff;
                padding: 20px;
                text-align: center;
              }
              .email-body {
                padding: 20px;
              }
              .email-footer {
                background-color: #333;
                color: #fff;
                padding: 20px;
                text-align: center;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="email">
                <div class="email-header">
                  <h1>${heading}</h1>
                </div>
                <div class="email-body">
                  <p>${text}</p>
                </div>
                <div class="email-footer">
                  <p>Don't reply to this mail.</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `;
};
const SDBG_SUBMIT_MAIL_TEMPLATE = (text, heading) => {
  return `
        <!DOCTYPE html>
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
                padding: 20px;
              }
              .email-header {
                background-color: #333;
                color: #fff;
                padding: 5px;
                text-align: center;
              }
              .email-body {
                padding: 20px;
              }
              .email-footer {
                background-color: #333;
                color: #fff;
                padding: 5px;
                text-align: center;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="email">
                <div class="email-header">
                  <h1>${heading}</h1>
                </div>
                <div class="email-body">
                  <p>${text}</p>
                </div>
                <div class="email-footer">
                  <p>Don't reply to this mail.</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `;
};
const DRAWING_SUBMIT_MAIL_TEMPLATE = (text, heading) => {
  return `
        <!DOCTYPE html>
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
                padding: 20px;
              }
              .email-header {
                background-color: #333;
                color: #fff;
                padding: 20px;
                text-align: center;
              }
              .email-body {
                padding: 20px;
              }
              .email-footer {
                background-color: #333;
                color: #fff;
                padding: 20px;
                text-align: center;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="email">
                <div class="email-header">
                  <h1>${heading}</h1>
                </div>
                <div class="email-body">
                  <p>${text}</p>
                </div>
                <div class="email-footer">
                  <p>Don't reply to this mail.</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `;
};
const QAP_SUBMIT_MAIL_TEMPLATE = (text, heading) => {
  return `
        <!DOCTYPE html>
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
                padding: 20px;
              }
              .email-header {
                background-color: #333;
                color: #fff;
                padding: 20px;
                text-align: center;
              }
              .email-body {
                padding: 20px;
              }
              .email-footer {
                background-color: #333;
                color: #fff;
                padding: 20px;
                text-align: center;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="email">
                <div class="email-header">
                  <h1>${heading}</h1>
                </div>
                <div class="email-body">
                  <p>${text}</p>
                </div>
                <div class="email-footer">
                  <p>Don't reply to this mail.</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `;
};
const VENDOR_REMINDER_EMAIL_TEMPLATE = (text, heading) => {
  return `
        <!DOCTYPE html>
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
                padding: 20px;
              }
              .email-header {
                background-color: #333;
                color: #fff;
                padding: 20px;
                text-align: center;
              }
              .email-body {
                padding: 20px;
              }
              .email-footer {
                background-color: #333;
                color: #fff;
                padding: 20px;
                text-align: center;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="email">
                <div class="email-header">
                  <h1>${heading}</h1>
                </div>
                <div class="email-body">
                  <p>${text}</p>
                </div>
                <div class="email-footer">
                  <p>Don't reply to this mail.</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `;
};
const VENDOR_PO_UPLOAD_IN_LAN_NIC = (text, heading) => {
  return `
        <!DOCTYPE html>
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
                padding: 20px;
              }
              .email-header {
                background-color: #333;
                color: #fff;
                padding: 20px;
                text-align: center;
              }
              .email-body {
                padding: 20px;
              }
              .email-footer {
                background-color: #333;
                color: #fff;
                padding: 20px;
                text-align: center;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="email">
                <div class="email-header">
                  <h1>${heading}</h1>
                </div>
                <div class="email-body">
                  <p>${text}</p>
                </div>
                <div class="email-footer">
                  <p>Don't reply to this mail.</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `;
};
const EMAIL_TEMPLAE = (text, heading = "") => {
  return `
        <!DOCTYPE html>
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
                padding: 20px;
              }
              .email-header {
                background-color: #333;
                color: #fff;
                padding: 20px;
                text-align: center;
              }
              .email-body {
                padding: 20px;
              }
              .email-footer {
                padding: 20px;
                text-align: center;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="email">
                <div class="email-body">
                  <p>${text}</p>
                </div>
                <div class="email-footer">
                  <p>Don't reply to this mail.</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `;
};


module.exports = { EMAIL_TEMPLAE, HTML_TEMPLATE, VENDOR_MAIL_TEMPLATE, OFFICERS_MAIL_TEMPLATE, SDBG_SUBMIT_MAIL_TEMPLATE, DRAWING_SUBMIT_MAIL_TEMPLATE, QAP_SUBMIT_MAIL_TEMPLATE, VENDOR_REMINDER_EMAIL_TEMPLATE, VENDOR_PO_UPLOAD_IN_LAN_NIC };
