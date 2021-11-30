from flask import Flask, request, render_template
from flask_mail import Mail, Message
from flask_cors import CORS, cross_origin
from os import getenv

app = Flask(__name__)
cors = CORS(app)
mail= Mail(app)

app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = getenv("email")
app.config['MAIL_PASSWORD'] = getenv("password")
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
mail = Mail(app)


@app.route("/")
def index():
   return render_template("index.html")


@app.route('/sendmail', methods=["GET", "POST"])
@cross_origin()
def send_mail():
    if request.method == "POST":
        name = request.form.get("name")
        sender_email = request.form.get("sender_email")
        message = request.form.get("message")

        print(f"Name: {name}")
        print(f"Sender Email: {sender_email}")
        print(f"Message: {message}")

        msg = Message('New Contact form entry on Website!', sender = (name, sender_email), recipients = [getenv("email")])
        msg.body = f"Sender Email: {sender_email}\nMessage: {message}"
        mail.send(msg)

        print("Sent Email")
        return "Sent"
    elif request.method == "GET":
        return "No U"


if __name__ == '__main__':
   app.run(host="0.0.0.0", port=8080, debug=True)
