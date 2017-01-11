/** 
 * @author 	: Rafael D. Lagemann
 * e-mail 	: rdlagemann@gmail.com
 * Computer Science
 * Federal University of Pelotas - Brazil
 * 01-09-2017 
 * 
 * */

import javax.swing.*;
import javax.swing.event.DocumentListener;
import javax.swing.event.DocumentEvent;

import java.util.regex.Pattern;
import java.util.regex.Matcher;

import java.util.ArrayList;

public class Search
{
	ArrayList<Person> people;
	Pattern pattern;
	String regex;

	public Search(ArrayList<Person> people)
	{	
		this.people = people;		
	}

	/**
	 * Search in 'people' for objects which matches 'regex'
	 * 
	 * @param entry		: user input
	 * @return findings	: a model to be used in a JList component	
	 */
	public DefaultListModel<Person> doSearch(String entry)
	{
		entry = entry.toLowerCase();
		regex = ".*" + entry + ".*";
		pattern = Pattern.compile(regex);
		
		DefaultListModel<Person> findings = new DefaultListModel<>();

		for(Person person : people)
		{
			if(pattern.matcher(person.getName().toLowerCase()).matches())
			{
				findings.addElement(person);
			}

		}

		return findings;
	}
}