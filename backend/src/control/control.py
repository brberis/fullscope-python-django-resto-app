from sonybraviaremote import TV, TVConfig

# called the very first time you attempt to connect to your
# tv... the tv will display a pincode that you need to enter
# after the first connection attempt, you'll never have to do this again
def on_auth():
    return input('Pincode: ')

# ip address of your tv... the device name is the name under which
# your program will be registered... note that if you change the device
# name, you have to re-auth
config = TVConfig('192.168.50.226', 'Bravia')
tv = TV.connect(config, on_auth)

tv.is_on() # true/false
tv.wake_up()
tv.power_off()
tv.netflix()
tv.home()
tv.enter()
tv.confirm()
tv.pause()
tv.play()
tv.confirm()
tv.mute()
tv.volume_up()
tv.volume_down()