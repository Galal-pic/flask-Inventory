from flask import Flask,jsonify,render_template,url_for,flash,redirect
from forms import RegistrationForm,LoginForm

app = Flask(__name__)
app.config['SECRET_KEY'] ="77153730a4e0cd4d2b10ad7e0f597addf263bf8a8c2da09011a5078edece1b94"

testdata = [{'name':'Galal','age':25},{'name':'sara','age':18},{'name':'aya','age':30},{'name':'abdo','age':7}]

@app.route('/')
@app.route('/home')
def hello_world():
    return render_template('home.html',testdata = testdata)

@app.route('/about')
def about():
    return 'welcome to about page'

@app.route('/register',methods=['POST','GET'])
def register():
    form = RegistrationForm()
    if form.validate_on_submit():
        # flash('Account created for {}! You can now log in.'.format(form.fname.data),'success')
        return redirect(url_for('login'))
    return render_template('register.html', form=form)

@app.route('/login')
def login():
    form = LoginForm()
    return render_template('login.html', form=form)
   

if __name__ == '__main__':
    app.run(debug=True)