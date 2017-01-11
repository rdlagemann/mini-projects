#
# Makefile model found on:
# <https://www.cs.swarthmore.edu/~newhall/unixhelp/javamakefiles.html>
#
JFLAGS = -g
JC = javac
.SUFFIXES: .java .class
.java.class:
	$(JC) $(JFLAGS) $*.java

CLASSES = \
        DynamicSearchUpdate.java \
        Person.java \
        Search.java        

MAIN = DynamicSearchUpdate

default: classes

classes: $(CLASSES:.java=.class)

clean:
	$(RM) *.class
