# Creating-Chatbot-using-Natural-Language-Processing-Natural-Language-Understanding
The project objective was to develop an application i.e. HR- Chatbot that can answer administrative questions specified by the users, such that the Human Resource (HR) employee can concentrate more on a Strategic Initiatives rather than just answering internal queries / administrative questions.
During research of the project it was found that, for creating Chatbot there are four components which are imperative such as:
•	User Interface
•	The Natural Language Processor (Abacus)
•	The Bot Framework.
•	The Database.
The Slack, Skype etc. could be the user interface through which users may interact with the Chatbot. These user interfaces are also known as “Channels” in Chatbot technology.
The Natural Language Processor (Abacus) is a tool that is used for making the system understand the exact meaning of the user text by extracting the Intents, the Entities and the Semantic Relations.
The Bot Framework helps in channelizing messages from Channels to Chatbot and Chatbot to Channels or it can also be said that the Bot Framework facilitates communication between the user and the Chatbot through Channels.
The Database is a location where the answers to all the frequently asked HR questions are stored. The answer to a query is searched in a Database after the correct Intents, Entities and Semantic Relation is extracted by the Natural Language Processor (Abacus) and the Bot Framework points it to the right location in the Database. 
Therefore, for the project the SAS Natural Language Processor application i.e. Abacus have been used. For Bot Framework the Microsoft’s Bot Framework concepts were referenced and based on that created SAS’s own Bot Framework with additional capabilities such as: -
•	Defining Flow of Conversation by using Abacus Recognizer within the function, which has helped the application to automatically invoke the method based on the Intent extracted by the SAS- Natural Language Processor (Abacus). “For this no hard coding was done”.
For the Postgres Database the SAS- Visual Investigator tool was used which acts as an interface for the HR employees to manage the Database. All the answers to the frequently asked HR queries/ questions has been stored in the SAS- Visual Investigator tool.
