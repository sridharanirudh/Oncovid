import sys

class server():
	def __init__(self):
		self.count = 0

	def do_something(self):
		print('Count:', self.count)
		
		self.count += 1
		if self.count == 10:
			print('Did it 10 times')
			return 1

		self.do_something()

if __name__ == '__main__':
	server_object = server()
	server_object.do_something()

	# print('Hey !!')
	# # inp  = input('Input: ')
	# # print(inp)
	# for line in sys.stdin: 
	# 	if 'q' == line.rstrip(): 
	# 		print('GOT INPUT of length:', len(line), 'STRIPPED TO length:', len(line.rstrip()))
	# 		break
	# 	print(f'This is what you entered on command line: {line}')
	# print("Exit")