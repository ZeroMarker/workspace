# execfile(r"C:\Projects\LogicCircuit\Samples\Main\Sources\DigitalClockTest.py")

print "Starting Clock Counter test"

# Output pins returns data in binary decimal format. This function convert it back to normal binary.
# Assuming output is one byte representing 2 digit number.
def ToInt(value):
	return ((value >> 4) & 0xF) * 10 + (value & 0xF)

# Perform full cycle of clock from 0 to 1 and back to 0
def Tick(test):
	test.SetInput("C", 1)
	test.Evaluate();
	test.SetInput("C", 0)
	test.Evaluate();

# Tests normal clock ticking for entire 24 hours + 5 seconds to check counter are passing through all values
def TestClockRun(test):
	h = ToInt(test.GetOutput("h"))
	m = ToInt(test.GetOutput("m"))
	s = ToInt(test.GetOutput("s"))
	for i in range(60 * 60 * 24 + 5):
		s = s + 1
		if(60 <= s):
			s = 0
			m = m + 1
			if(60 <= m):
				m = 0
				h = h + 1
				if(24 <= h):
					h = 0
		Tick(test)
		sec = ToInt(test.GetOutput("s"))
		min = ToInt(test.GetOutput("m"))
		hor = ToInt(test.GetOutput("h"))
		if(sec != s):
			raise AssertionError("sec={0} is incorrect".format(sec))
		if(min != m):
			raise AssertionError("min={0} is incorrect".format(min))
		if(hor != h):
			raise AssertionError("hor={0} is incorrect".format(hor))
		if(min == 0 and sec == 0):
			print "{0} hour(s) checked".format(h)
	print "TestClockRun pass"

def ResetClock(test):
	# Circuit has reset input. Lets reset all counters to 0.
	tester.SetInput("Cls", 1)
	tester.Evaluate();
	# The circuit should oprate when Cls input is set to 0.
	tester.SetInput("Cls", 0)
	tester.Evaluate();

# Check current project is the right one.
if App.Editor.Project.Name != "Digital Clock":
	raise AssertionError("Please open Digital Clock project")

# Create tester for the circuit "Clock Counter"
tester = App.CreateTester("Clock Counter")
ResetClock(tester)
# Now test the full 24 hours cycle
TestClockRun(tester)
