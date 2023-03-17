# forward-vs-assumed
A JS simulation of forward vs assumed filling of random rooms with random keys 
Runs a number of different simulations against a fairly basic graph

## Graph
4 rooms (lets call them 1, 2, 3, 4) and 4 keys (A, B, Y, Z)
rooms 1, 2 are unlocked from the start
key A unlocks room 3
key B unlocks room 4
keys Y, Z do nothing

## Random Fill
puts keys in random rooms, then checks if all rooms are accessable. If not, it tries again.
KOs (IE - tries again) 50% of the time, becuase there are 24 total possiblities (4x3x2x1) and only 12 completable set ups
Has the most even spread (because random)

## Off Random
puts keys in random rooms that are not locked by said key, then checks if all rooms are sccessaable. If not, it tries again.
KOs about 23% of the time 
Has the same spread as random (because it effectively is), but since it calls for a valid check each time just like random, random is probably better in most cases, depending on how complex the graph is.

## Forward Random
puts a random key in a reachable room, then repeats until it runs out of rooms or keys. If it runs out of rooms, it KOs and tries again. If it runs out of keys, it returns as successful.
KOs 50% of the time, this is less obvious... but markable with a large logic graph. 
Has an even spread, and is largely equivelent to "Random Fill" for this data set.

## Forward Priority
puts a progression key (IE: A, B) in a reachable room, and repeats progression-keys first. Once it's out of progression keys it randomly places all remaining keys in the remaining rooms.
Can't KO! Since progression is prioritized it cannot get stuck
Uneven spread, again since progression is prioritized keys "A" and "B" are more likely to be in rooms 1, 2. This is because they get to "double dip" on rooms 1/2. 

## Forward Batch
chooses a progression key, then chooses random keys until it has enough to fill all available rooms. Shuffles that mini-set of keys into available rooms. Repeats until out of progression keys, at which point all remaining keys are placed randomly
Can't KO! Since there is always atleast one progression key, there is atleast one new room available after each iteration. Allowing for the next progression key and so on.
Has an even spread, on par with Random Fill for this data set. 

## Assumed Random
Unlike Forward Fills, Assumed Fills work backwards. That is, it starts with all rooms available and all keys obtained. Assumed Random then removes a random key, and shrinks the available rooms as needed. It has a stop-gap that once it runs out of available rooms, it shuffles all remaining keys into remaining (but unavailable) rooms then checks if all rooms are reachable. 
KOs about 1/4 times. Without the stopgap it KOs 3/4 times.
Has an ok spread. For the most part it's a higher standard deviation than Random or Forward Batch, but it can have a lower percentage of keys A and B being in rooms 1 and 2. Sometimes de-clumping is more important than having a true spread.

## Assumed Priority
Like Assumed Random, Assumed priority starts with all rooms available and all keys obtained. It then puts a progression key in an available room. It repeats for all progression keys. Once all progression keys are placed, remaining keys are placed randomly. 
Can't KO! like forward priority, placing the progression keys first prevent getting stuck.
Has a bad spread. This logic is the most likely to clump keys, and to result in the same set of key locations. 

## Conclusion
This graph is too simple to show meaningful distinctions. Pure random has the best spread, and the highest KO rate. This makes it good for simple graphs, but likely problematic for larger graphs. Forward Random and Assumed Random are similar, against small graphs Forward Random results in lower devation, but KOs more often. Forward Priority and Assumed Priority both have the same issues. That is, a high standard deviation and resulting in the "same" outcoming more often than not. Assumed Priority has the worst overall results. However, both priority fills never KO! Forward Batch is an interesting case I'd like to explore more on a larger graph. It preforms as well as pure random, but never KOs.
Random, Off Random, and Forward Batch all have the same spread, and forward batch cannot KO and could be built iteratively. I expect Forward Batch to become less stable once trees have crossing branches.

## Charting out the options
This graph is simple enough where it can be done by hand. I attempted this here:
https://docs.google.com/spreadsheets/d/1ktKZdsnIBAta2DPf4iG_sE10mH6mA03zZ1NrxXo7kqI/edit?usp=sharing