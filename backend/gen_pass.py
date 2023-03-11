from werkzeug.security import generate_password_hash, check_password_hash

hashed = generate_password_hash('jamespass')

ispass = check_password_hash(hashed, 'jamespass')

print(hashed)

print(ispass)