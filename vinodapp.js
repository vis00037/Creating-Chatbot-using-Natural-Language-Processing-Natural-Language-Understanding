var restify = require('restify');
var builder = require('botbuilder');
var pg = require('pg');
/*var nodemailer = require('nodemailer');*/

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});


var connectionString = "postgres://dbmsowner:Go4thsas@intell.mtlgmn.intell.unx.sas.com:5432/main";
var pgClient = new pg.Client(connectionString);
pgClient.connect();

		
// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());



var abacusRecognizer = require('./lib/AbacusRecogniser.js');
abacusRecognizerObj=new abacusRecognizer();
var dialog = new builder.IntentDialog({ recognizers: [abacusRecognizerObj] });//pass here Abacus Recognizer instead of luis
var intents = new builder.IntentDialog();



var bot = new builder.UniversalBot(connector)//.set('storage', tableStorage);//set your storage here
bot.use(builder.Middleware.dialogVersion({ version: 3.0, resetCommand: /^reset/i }));



/*bot.dialog('/',dialog);*/

/*
bot.dialog('/', [function (session) {
    session.send("Hello & Welcome to the HR-ChatBot");
	builder.Prompts.text(session, "Please tell me, How can I help you?");	
	},
			function(session,results){
				session.dialogData.Questions = results.response;
				session.send("I can answer queries related to HR, If you have.");
				builder.Prompts.text(session,"Do you have any query");
					},
			function(session,results){
				session.dialogData.Confirm = results.response;
				builder.Prompts.text(session,"Ok, please tell me the category for your query");
					},
			function(session,results){
				session.dialogData.Category = results.response;
				builder.Prompts.text(session,"Ok, Please tell me what do you want to know about your Salary");
					},
			function(session,results){
				session.dialogData.Salary = results.response;
				builder.Prompts.text(session, " Sure, Just a moment !!!!! ");
					},
			function(session,results){
				session.dialogData.Ok = results.response;
				session.send("Your Annual Salary is £30K");
				builder.Prompts.confirm(session, " Is there anything else you want to know? ")
					},
			function(session,results){
				session.dialogData.Thankyou = results.response;
				session.endDialog("Ok, GoodBye untill next time");
						}	
					]
				);
				
				
				


// This method return how to change Bank Details
// Can use "session.endConversation", this clears both the current dialog stack and the data stored in the session, except user data.

bot.dialog('/', [
    function (session) {
        session.send("Hello & Welcome to the HR-ChatBot");
		builder.Prompts.choice(session, "Choose an option:", 'Select Change_BankDetails|Select Procedure_Benefits|Select UrgentAction|Order Benefits_Year');
    },
    function (session, results) {
        switch (results.response.index) {
            case 0:
                session.beginDialog('Change_BankDetails');
                break;
            case 1:
                session.beginDialog('Procedure_Benefits');
                break;
            case 2:
                session.beginDialog('UrgentAction');
                break;
            case 3:
                session.beginDialog('Benefits_Year');
                break;
            default:
                session.endDialog("Ok, GoodBye untill next time");
                break;
				}
			}
		]
	);

/*
bot.dialog('/', [
    function (session) {
        session.send("Hello & Welcome to the HR-ChatBot");
		builder.Prompts.text(session,"Please tell me how may I help you?");
	},
	function (session, results,next) {
		session.dialogData.res = results.response;
		next();
	},
	function(session) {
		var res1 = session.dialogData.res;
		session.beginDialog(dialog.matches(res1));
	}
	]);

	

bot.dialog('/', [
    function (session) {
        session.send("Hello & Welcome to the HR-ChatBot");
		builder.Prompts.text(session,"Please tell me how may I help you?");
	},
	function (session, results) {
		var sel = session.dialogData.selection = builder.EntityRecognizer.findEntity(results.intent.entities,'sel'); 
		dialog.matches('sel'); // How to use the data in this variable
		session.beginDialog('sel');
		builder.Prompts.confirm(session,"Is there anything else you want to know?");
		},
	function (session,results) {
		session.dialogData.Confirm = results.response;
		if(results.response == 'No'){
			session.endDialog("Ok, GoodBye untill next time");
		}
		else
		{
			session.replaceDialog('/');
				}
			}
		]
	);
*/

// THIS METHOD SENDS A WELCOME MESSAGE AS SOON AS A NEW USER GETS CONNECTED TO THE BOT
bot.on('conversationUpdate', function (message) {
               if (message.membersAdded) {
                              message.membersAdded.forEach(function (identity) {
                                             if (identity.id === message.address.bot.id) {
                                                            var msg = new builder.Message().address(message.address);
                                                            msg.text("Hello, welcome to the SAS HR Bot");
                                                            bot.send(msg);
															bot.beginDialog(message.address, '/');
                                             }
                              });
               }
});


// THIS METHOD CONTROLS THE "FLOW OF CONVERSATION" WITHIN THE BOTFRAMEWORK.
bot.dialog('/', [
    function (session) {
		builder.Prompts.text(session,"Please feel free to ask me a question ");
	},
	function(session, results){
		abacusRecognizerObj.recognize(session, function (err, results) {
            console.log(results);
            if (results && results.intent !== 'unknown_intent') {
                session.beginDialog(results.intent);
            } 
			else {
				session.send("I'm sorry but I didn't quite understand what you were asking for.  Please try again.");
                session.beginDialog('/'); 
				}
			}
			
		)
	},
	function(session,results){
	builder.Prompts.confirm(session,"Was this information relevant to your query?");
	},
	function(session, results){
		if(results.response){
				session.send("Great if you want to know anything else ");
				session.beginDialog('/');
		}
		else
		{
			session.send("Sorry about that");
			builder.Prompts.confirm(session, "As we are having trouble getting your answer, Would you like me to email AskHR for you?");
		}
	},
	function(session, results){
		if(results.response){
			session.send("Ok, I have emailed AskHR and CC'D you");
			session.beginDialog('/');
			}
		else 
		{
			session.send("Ok no problem, Please feel free to contact your HR Rep for your query and if you want to know anything else than");
			session.beginDialog('/');
		}
	}
]);


/*dialog.matches('Change_BankDetails','Change_BankDetails');*/

bot.dialog('Change_BankDetails', [function(session) {
	var querystring = "SELECT * from \"fdhdata\".\"HRFAQ\" where category = 'Change_BankDetails';"

		// callback
		pgClient.query(querystring, (err, res) => {
		  if (err) {
			console.log(err.stack)
		  } else {
			for (i = 0; i < res.rows.length; i++) { 
				session.endDialog(res.rows[i].details);
					}
				}
			})
		}
	]);
	
	
// How can I use same method to fetch result for different category such as employeeID, Benefits etc.


	
/*dialog.matches('Find','Find');*/

bot.dialog('Find',[function(session) {
	session.send("Benefit selections or changes made in MyChoice are collected once a month and sent in bulk to suppliers for orders to be fulfilled or amendments processed. The cut-off date is 17th of every month.");
	session.send("If you complete the benefit submission process in MyChoice and where required, also complete any necessary online documentation with the supplier eg. Gym, Gadgets by midnight on 17th of the month, your benefit change will be processed the following month.");
	session.send("Physical benefits will be delivered by 1st Gadgets, Dining cards, Memberships/insurances will start on 1st, Pension/Savings changes will be processed during the month.");				  
	session.send("All deductions or credits for benefit changes will show in your payslip at the end of the month your benefit is delivered. Note: Benefit submission made after 17th of the month will not be fulfilled the following month but carried over for processing and fulfilled the money after that.");
	session.send("No exceptions can be made to the schedule which is fully automated and involves reporting and processing between three entities; MyChoice, SAS and the benefit provider.");
	session.send("Please refer to the the My Choice benefits portal for full details on specific benefits and if you have any queries, contact the My Choice helpdesk on the details below.");
	session.send("UK Email: sasMyChoice.helpdesk@aon.com, Tel No: 0344 573 0022");
	session.endDialog();
			}
		]
	);

	
/*dialog.matches('Procedure_Benefits','Procedure_Benefits');*/	
bot.dialog('Procedure_Benefits',[function(session) {
	session.send("You can submit the benefits through MyChoice Portal");
	session.send("Please refer to the the My Choice benefits portal for full details on specific benefits and if you have any queries, contact the My Choice helpdesk on the details below.");
	session.send("Email: sasMyChoice.helpdesk@aon.com, Tel No: 0344 573 0022");
	session.endDialog();
			}
		]
	);
		
/*dialog.matches('UrgentAction','UrgentAction');*/
bot.dialog('UrgentAction',[function(session){
	session.send("Benefit changes which are submitted by 17th of the month will be processed the following month.");
	session.send("If you submitted the cancellation after 17th of the last month, your cancellation will have missed the monthly processing and will be picked up and processed the 17th of this month and deductions will stop next month.");
	session.send("If you submitted the cancellation by 17th of last month, please contact the MyChoice helpdesk who will be able to assist.");
	session.send("Email: sasMyChoice.helpdesk@aon.com, Tel No: 0344 573 0022");
	session.endDialog();
			}
		]
	);
// NEED TO CODE FOR QUERY-----> EXPENSES	
/*dialog.matches('Query','Query');*/
bot.dialog('Query',[function(session) {
	session.send("Please get in contact direclty with MyChoice who will be able to assist you with your benefits query, Telephone: 0344 573 0022, Email: sasMyChoice.helpdesk@aon.com");
	session.endDialog();
			}
		]
	);
	
/*dialog.matches('Benefits_Year','Benefits_Year');*/
bot.dialog('Benefits_Year',[function(session) {
	session.send("The benefit year starts on the 1st July.");
	session.endDialog();
			}
		]
	);
	
/*dialog.matches('MyBenefits_Start','MyBenefits_Start');*/
bot.dialog('MyBenefits_Start',[function(session) {
	session.send("Your core benefits start from when you join SAS but any voluntary benefits you select will depend on your start date. If you have joined us early in the month and are able to make your selections by the 17th, your voluntary benefits selections will start on the 1st of the coming month. If your selections are submitted after 17th, your benefits will start on the 1st of the month after.");
	session.endDialog();
			}
		]
	);
	
/*dialog.matches('Access_Time','Access_Time');*/
bot.dialog('Access_Time',[function(session) {
	session.send("Benefit windows are open for 10 days, NEW JOINERS have 10 days from receiving the email login to select and submit benefits in the MyChoice portal, Employee triggered benefit windows (ANYTIME, HOLIDAY TRADE, LIFE EVENT...) are also open for 10 days, The ANNUAL ENROLMENT window can be longer than 10 days, please refer to communication sent from askHR during May for dates, Once submitted, the window closes and is locked for loading the benefits selected, See 'When will I recieve my benefits' for delivery cycle.");
	session.endDialog();
			}
		]
	);
	
/*dialog.matches('Benefits_Supplier','Benefits_Supplier');*/
bot.dialog('Benefits_Supplier', [function(session) {
	session.send("You will find details for all benefit suppliers on My Choice under 'Benefits' > 'View All Benefits', Each benefit has a 'Contacts' tab containing full details of how to get in touch with the provider, together with any policy/membership reference numbers.");
	session.endDialog();
			}
		]
	);
	
/*dialog.matches('Possible_toChange','Possible_toChange');*/
bot.dialog('Possible_toChange', [function(session) {
	session.send("Some benefits are Anytime Benefits and can be changed at anytime during the year.  Other benefits cannot be changed except for in certain circumstances which qualify as Lifetime Events.  Further details about Lifetime Events can be found on the My Choice benefits portal. To open an Anytime or Lifetime event window, access the My Choice benefit portal, click on 'Benefits - Get Started' and follow the instructions. Contact the My Choice helpdesk if you have any queries on the contact details below.");
	session.send("Email: sasMyChoice.helpdesk@aon.com, Tel No (UK): 0344 573 0022");
	session.endDialog();
			}
		]
	);
	
/*dialog.matches('Select','Select');*/
bot.dialog('Select',[function(session) {
	session.send("If you are a new starter you will be sent an email on the Tuesday after your first day of employment, directing you to the MyChoice benefits platform.  You will have 10 days to make your selection and submit your benefit choices.<Br/> For all other employees, there are a wide range of benefits which can be selected at anytime during the benefit year.  These are referred to as Anytime Benefits and can be selected by accessing the My Choice benefits portal, clicking on 'Benefits > Update my benefits' and following the instrucitons for opening an Anytime event. <Br/> The annual benefit enrolment window opens for all employees towards the end of May and is available for around 2 weeks in order for your benefit choices to be made for the following benefit year starting each 1st July. <Br/> In addition, there are certain circumstances when employees may be eligilbe to make changes to their benefits due to the occurance of a Lifetime Event.  Please refer to the the My Choice benefits portal for more details or contact the My Choice helpdesk on the details below. <Br/> UK- Email: sasMyChoice.helpdesk@aon.com, Tel No: 0344 573 0022");
	session.endDialog();
			}
		]
	);

/*dialog.matches('Stop','Stop');*/
bot.dialog('Stop', [function(session) {
	session.send("You can cancel this benefit at Anytime through MyChoice by simply opening an Anytime event window and changing your selection of the Childcare Vouchers benefit. <Br/> To open an Anytime event window, access My Choice then click on 'Benefits' > 'Update my benefits' and Childcare Vouchers is one of the Finance benefits. <Br/> If you need any help with the process, the MyChoice helpdesk will be able to guide you. <Br/> Tel: 0344 573 0022, Email: sasmychoice.helpdesk@aon.com");
	session.endDialog();
			}
		]
	);
	
/*dialog.matches('Expired','Expired');*/
bot.dialog('Expired',[function(session) {
	session.send("First check that you also put the amount of your membership renewal into MyChoice.  This is required for your membership request through Gymflex to be authorised.  The process is explained in MyChoice under the 'Benefit Information' tab of the Gymflex benefit. <Br/> Next, check that you completed the process for submitting your gym membership renewal by 17th of the month.  Any submissions after 17th will not be processed for the 1st of the following month but 1st of the month after. <Br/> If you are still concerned about your membership, contact the My Choice helpdesk who should be able to help. <Br/> Email: sasMyChoice.helpdesk@aon.com, Tel No (UK): 0344 573 0022 <Br/> They will be able to help and liasie with Gymflex and if necessary, your Gym.");
	session.endDialog();
			}
		]
	);
	
/*dialog.matches('Add_PMC','Add_PMC');*/
bot.dialog('Add_PMC',[function(session) {
	session.send("Changes to your Private Medical cover can only be made outside of each 1st July annual benefits enrolment if the change is triggered by a significant life event. <Br/> Examples of signifcant life events: new baby or adoption, Got married, Partner's loss of employment. <Br/> Under HMRC rules, changes can not be made mid way through your annual membership unless a significant life event has taken place. <Br/> Note: Concern over a dependant's health does not fall into the government's scope for making a change and SAS cannot make any exceptions to the rules. <Br/> To add/remove a dependant following a life event, go to My Choice, Benefits and follow the instructions to open a benefit window. <Br/> Please refer to My Choice if you have any questions.");
	session.endDialog();
			}
		]
	);
	
/*dialog.matches('Contact','Contact');*/
bot.dialog('Contact',[function(session) {
	session.send("No.  Contact can only be made by phone or via the Customer Online service. <Br/> Phone: 0800 593 5957 <Br/> Customer Online: Once you have registered with this service, you will have access to details about your treatments, claims history and be able to upload documents and message the team.  This is a secure environment for sending and receiving documents and messages. <Br/> Further details about registering with Customer Online can be found in the Wellbeing Zone area of the HR Intranet.");
	session.endDialog();
			}
		]
	);
	
/*dialog.matches('Claim','Claim');*/
bot.dialog('Claim',[function(session) {
	session.send("Please log on to the UK & Ireland Grapevine and select the Expense Policy. <Br/> You will find this information under Miscellaneous, Eye Tests and Corrective Lenses.");
	session.endDialog();
			}
		]
	);
	
/*dialog.matches('Recognise','Recognise');*/
bot.dialog('Recognise',[function(session) {
	session.send("Yes, there is a Long Service recognition program.  Details can be found on the HR Intranet. <Br/> Here is a link: http://uk.na.sas.com/Back%20Office/HR/HR%20Documents/Long%20Service%20Awards.docx");
	session.endDialog();
			}
		]
	);

/*dialog.matches('Setup','Setup');*/
bot.dialog('Setup',[function(session) {
	session.send("Once you have completed the request in MyChoice to start saving with the SAS Savings Scheme, Aviva (previously Friends Life) will be notified and will send you a logon email.  You then need to set up the ISA or General Savings Account on Aviva's My Money savings platform. <Br/> 'SAS Savings Scheme - Applying for your Product Guide' is a really clear guide if you find you need help with this.  It can be found in the Reward & Recognition area of the HR Intranet, <Br/> Here is a link: http://uk.na.sas.com/Back%20Office/HR/HR%20Documents/SAS%20Savings%20Scheme%20-%20Applying%20for%20your%20Product%20Guide.pdf <Br/> If you have any difficulty setting up your account after reading this guide, please contact askHR.");	
	session.endDialog();
			}
		]
	);
	
/*dialog.matches('Send','Send');*/
bot.dialog('Send',[function(session) {
	session.send("Disturbance allowance forms should be sent directly to GBR Payroll once approved by manager.");
	session.endDialog();
			}
		]
	);
	
/*dialog.matches('Change_MyAddress','Change_MyAddress');*/
bot.dialog('Change_MyAddress', [function(session) {
	session.send("You can change your address in Workday: go into Workday, click personal, click contact, click edit, update the address, click submit at bottom of page, click done. <Br/> Payroll and HR will then be notified of the change.");
	session.endDialog();
			}
		]
	);
	
/*dialog.matches('Change_Working_Pattern','Change_Working_Pattern');*/
bot.dialog('Change_Working_Pattern',[function(session) {
	session.send("To make a flexible working request, you will need to submit a written application within the formal procedure to your manager. <Br/> Your application should be submitted in good time and ideally at least two months before you would like the changes to take effect.");
	session.endDialog();
			}
		]
	);
	
/*dialog.matches('Add_EmergencyContacts','Add_EmergencyContacts');*/
bot.dialog('Add_EmergencyContacts',[function(session) {
	session.send("Go into Workday: <Br/> 1.	Click Emergency Contacts <Br/> 2.	Click Edit <Br/> 3.	Click on icon on right hand side on each appropriate <Br/> 4.	Update details <Br/> 5.	Click submit at bottom of page <Br/> 6.	Click done, <Br/> Or for further help click here: http://sww.sas.com/hrweb/HRDocs/WDAddinganEmergencyContact.pdf, Whilst changing / amending these details you may wish to consider updating your Nomination of Beneficiaries. <Br/> This form can be found on the HR Portal under forms");
	session.endDialog();
			}
		]
	);
	
/*dialog.matches('Download','Download');*/
bot.dialog('Download',[function(session) {
	session.send("Please follow the instructions in this link: https://sas.service-now.com/nav_to.do?uri=%2Fkb_view.do%3Fsysparm_article%3DKB0012346");
	session.endDialog();
			}
		]
	);
	
/*dialog.matches('Address','Address');*/
bot.dialog('Address',[function(session) {
	session.send("Due to data protection legislation, we're unable to disclose any employee's personal information without their permission.");
	session.endDialog();
			}
		]
	);
	
/*dialog.matches('Contractor','Contractor');*/
bot.dialog('Contractor',[function(session) {
	session.send("Contractors do not have full access to Workday, therfore it is not possible to give feedback. <Br/> An alternative is for the contractor to email the individual their feedback, and the individual that is requesting feedback can put it on their workday record.");
	session.endDialog();
			}
		]
	);
// THIS IS NOT FULLY FUNCTIONING WITH "REMOVE AND ARCHIVE"  	
/*dialog.matches('Goals','Goals');*/
bot.dialog('Goals',[function(session) {
	session.send("1) Enter Workday <Br/> 2) Click on Performance <Br/> 3) Click on Goals <Br/> 4) Click on the Archived Goals tab (You have Personal Goals, Goal Details, Archived Goals options) <Br/> 5) Click on Archive Goals <Br/> 6) Select all the goals you wish to Archive <Br/> 7) Click on Submit <Br/> 8) Click on Done <Br/> 9) Click on House button top right to take you back to Workday Home Screen");
	session.endDialog();
			}
		]
	);
	
/*dialog.matches('Exporting_My_Goals','Exporting_My_Goals');*/
bot.dialog('Exporting_My_Goals',[function(session) {
	session.send("There is indeed.  View the goals in the goal detail section, on the right hand side of the screen you will then have the option to output to excel. <Br/> Please note this is high level output with no comments from the activity stream.");
	session.endDialog();
			}
		]
	);
// ITS NOT WORKING FOR- "IF I DONT USE MY HOLIDAY THIS YEAR, CAN I CARRY THEM TO THE NEXT FINANCIAL YEAR"	
/*dialog.matches('Carry_Forward','Carry_Forward');*/
bot.dialog('Carry_Forward',[function(session) {
	session.send("You can carry up to 5 days holiday over to the next holiday year. <Br/> These days will be carried over automatically. <Br/> Any holidays left beyond 5 days will not carry over and so these would be forfeited. <Br/> Denmark: Up till 4 special holidays can be paid out. Special holidays (feriefridage) cannot be carried over. <Br/> The carryover will not happen automatically. <Br/> Information on the carryover process will be provided on Vitus in April.");
	session.endDialog();
			}
		]
	);

/*dialog.matches('NewHire','NewHire');*/
bot.dialog('NewHire',[function(session) {
	session.send("New employees can buy (not sell) up to 5 days holiday during their new joiner My Choice enrolment window. <Br/> The next opportunity they will have to trade holiday will be during the annual enrolment window when they can buy or sell up to 5 days holiday from the following year's entitlement. <Br/> The holiday year runs from 1st July to 30th June.");
	session.endDialog();
			}
		]
	);
	
/*dialog.matches('Cancel','Cancel');*/
bot.dialog('Cancel',[function(session) {
	session.send("Click on the holiday you've booked, and select the '-' (minus) next to the date. This will then send an alert to your manager, who then has to approve this cancelled holiday. <Br/> Please view the video tutorials on Workday which can be found under 'Absence Training for Employees'.");
	session.endDialog();
			}
		]
	);
	

/*
bot.dialog('Change_BankDetails', function (session) {
    session.send("Hello & Welcome to the HR-ChatBot");
	session.send("Please tell me, How can I help you today?");
	bot.beginDialog('Change_BankDetails');
	},
	function (session,results){
		session.send("Please send an email to GBR payroll and state whether for expenses/ salaries or both.");
					}
				);
*/

/*
dailog.matches('Change_BankDetails','Change_BankDetails');
bot.dialog('Change_BankDetails',[
	function(session,args,next) {
		var intent = args.intent;
		var entities = args.entities;
		if(entities.length > 0)
	  {	
		var BankDetails = args.entities[1];
		session.send("Please send an email to GBR payroll and state whether for expenses/ salaries or both.");
		builder.Prompts.choice("Is there anything else you want to know?": "Yes|No"); // why builder?, why not session?
	  }
	  else{
		  session.send("No Such Information Found");
	}
	session.endDialog();
	]);
*/


/*-------------------------------------------------------------------------------------------------------------------------------



dialog.matches('raise_Midas','raise_Midas');
bot.dialog('raise_Midas', [
    function (session, args, next) {
      builder.Prompts.text(session,"No problem, what is the title of the MIDAS?"); 
	},
	 function (session, results, next) {
		 session.dialogData.title = results.response;
		 builder.Prompts.text(session,"Ok, what are the details of your request?");
	},
	function (session, results, next) {
		 session.dialogData.details = results.response;
		 session.send("Ok, I raised a new MIDAS with the title: " + session.dialogData.title);	
		 session.send("Link: http://whichmidas.sas.com/ticketDetail.aspx?id=1800869");
		 session.endConversation(); 
	}
]);

dialog.matches('add_workdayGoal','add_workdayGoal');
bot.dialog('add_workdayGoal', [
    function (session, args, next) {
      builder.Prompts.text(session,"No problem, what is the title of this goal?"); 
	},
	 function (session, results, next) {
		 session.dialogData.title = results.response;
		 builder.Prompts.text(session,"Ok, what are the details of the goal?");
	},
	function (session, results, next) {
		 session.dialogData.details = results.response;
		 builder.Prompts.choice(session, "What category does this goal fall under?", "Shape the customer relationship|Secure the future|Grow profitability", { listStyle: builder.ListStyle.button })
	},
	function (session, results, next) {
		 session.dialogData.details = results.response;
		 session.send("Ok, I added a new goal with the title: " + session.dialogData.title);	
		 session.endConversation(); 
	}
]);

dialog.matches('get_holidayAmount','get_holidayAmount');
bot.dialog('get_holidayAmount', [
	function (session, args, next) {
		var holidayRequestType = args.entities[1];
		
		if(holidayRequestType=='remaining')
		{
			session.send("Hi, you currently have 30 holiday days remaining"); 
		}
		else if(holidayRequestType=='taken')
		{
			session.send("Hi, you have currently taken 4 days holiday this year");
		}
		session.endConversation(); 
	}
]);

dialog.matches('get_policy','get_policy');
bot.dialog('get_policy', [
    function (session, args, next) {
	  var intent = args.intent;
	  //console.log(args);
	  //console.log(args.entities[0]);
	  var entities = args.entities;
	  if(entities.length > 0)
	  {		  
		var policyType = args.entities[1];
		var querystring = "SELECT * from \"fdhdata\".\"HRFAQ\" where category = '"+policyType+"';"

		// callback
		pgClient.query(querystring, (err, res) => {
		  if (err) {
			console.log(err.stack)
		  } else {
			for (i = 0; i < res.rows.length; i++) { 
				session.send(res.rows[i].details);
			}
		  }
		})
	  }
	  else
	  {
		  session.send("No policy information found for that particular request");
	  }
	  session.endConversation(); 
    }
]);

*/

//dialog.matches('unknown_intent','unknown_intent');
bot.dialog('unknown_intent', [
    function (session, args, next) {
      session.send("I'm sorry but I didn't quite understand what you were asking for.  Please try again."); 
      session.endDialog();   
    }
]);

