/** 
 * @author 	: Rafael D. Lagemann
 * e-mail 	: rdlagemann@gmail.com
 * Computer Science
 * Federal University of Pelotas - Brazil
 * 01-09-2017 
 * 
 * */

public class Person
{
	String name;

	public Person(String name)
	{
		this.name = name;
	}

	public String getName()
	{
		return name;
	}
	/**
	 * Overrides toString() (to be used by JList)
	 * @return name
	 */
	public String toString()
	{
		return name;
	}
}