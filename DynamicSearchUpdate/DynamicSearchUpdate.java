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

import java.awt.*;
import java.awt.event.*;
import java.util.ArrayList;

public class DynamicSearchUpdate
{
	static JFrame frame;

	JTextField searchField;
	JList<Person> searchList;
	DefaultListModel<Person> defaultModel;

	ArrayList<Person> people;
	TextChangeListener textChange;

	Search searchTool;

	public static void main(String[] args)
	{
		DynamicSearchUpdate app = new DynamicSearchUpdate();
		
		app.createUtilities();		
		app.startGUI();
	}

	public void createUtilities()
	{
		people = new ArrayList<>();	
		people.add(new Person("Frodo"));
		people.add(new Person("Frida"));
		people.add(new Person("Sam"));
		people.add(new Person("Samantha Fr."));
		people.add(new Person("Bilbo"));
		people.add(new Person("Billy"));

		searchTool = new Search(people);
	}

	/**
	 * Set and start GUI components
	 */
	public void startGUI()
	{
		// North panel components		
		JPanel northPanel = new JPanel();
		northPanel.setLayout(new BoxLayout(northPanel, BoxLayout.X_AXIS));

		JLabel searchLabel = new JLabel("Search:");
		northPanel.add(searchLabel);

		searchField = new JTextField();
		textChange = new TextChangeListener();
		searchField.getDocument().addDocumentListener(textChange);
		northPanel.add(searchField);

		// Center panel components
		JPanel centerPanel = new JPanel();
		centerPanel.setLayout(new BorderLayout());	// to fit full CENTER dimensions

		// load 
		defaultModel = new DefaultListModel<>();
		for(Person person : people)
		{
			defaultModel.addElement(person);
		}
		searchList = new JList<>(defaultModel);

		JScrollPane searchScroller = new JScrollPane(searchList);
		searchScroller.setVerticalScrollBarPolicy(ScrollPaneConstants.VERTICAL_SCROLLBAR_ALWAYS);
		searchScroller.setHorizontalScrollBarPolicy(ScrollPaneConstants.HORIZONTAL_SCROLLBAR_NEVER);
		centerPanel.add(searchScroller, BorderLayout.CENTER);

		// Frame config
		frame = new JFrame();
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

		frame.getContentPane().add(BorderLayout.NORTH, northPanel);
		frame.getContentPane().add(BorderLayout.CENTER, centerPanel);

		frame.setSize(300,300);
		frame.setVisible(true);

	}

	/**
	 * Inner class approach to listen for changes in input text field
	 */
	class TextChangeListener implements DocumentListener
	{
		public void changedUpdate(DocumentEvent e)
		{

			searchAndUpdateList();
		}

		public void removeUpdate(DocumentEvent e)
		{
			searchAndUpdateList();
		}

		public void insertUpdate(DocumentEvent e)
		{
			searchAndUpdateList();
		}

		public void searchAndUpdateList()
		{
			if(searchField.getText().equals(""))
			{
				// reset to default model
				searchList.setModel(defaultModel);				
			}
			else
			{
				// do the search and refresh the model
				searchList.setModel(searchTool.doSearch(searchField.getText()));
			}
			
		}
	}


}