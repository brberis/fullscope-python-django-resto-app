import random
import string

SHORTCODE_MIN = 8

def code_generator(size=SHORTCODE_MIN, chars=string.ascii_uppercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))   

DONT_USE = ['create']
def random_string_generator(size=10, chars=string.ascii_lowercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))

def unique_code_id_generator(instance, new_id=None):

    if new_id is not None:
        code_id = new_id
    else:
        code_id = code_generator()
    if code_id in DONT_USE:
        new_id = "{code_id}-{randstr}".format(
                    code_id=code_id,
                    randstr=random_string_generator(size=4)
                )
        return unique_code_id_generator(instance, new_id=new_id)
    Klass = instance.__class__
    qs_exists = Klass.objects.filter(code=code_id).exists()
    if qs_exists:
        new_id = "{code_id}-{randstr}".format(
                    code_id=code_id,
                    randstr=random_string_generator(size=4)
                )
        return unique_code_id_generator(instance, new_id=new_id)
    return code_id