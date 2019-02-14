package com.sas.cognitive.nlu.testBeads;

import static com.sas.cognitive.nlu.modules.domainterms.bead.BeadLogic.and;
import static com.sas.cognitive.nlu.modules.domainterms.bead.BeadLogic.or;

import com.sas.cognitive.nlu.bead.BeadElem;
import com.sas.cognitive.nlu.bead.Lexeme;
import com.sas.cognitive.nlu.modules.domainterms.bead.BeadLogic;
import com.sas.cognitive.nlu.modules.domainterms.datasource.SimpleStringSetDataSourceConfiguration;
import com.sas.cognitive.nlu.modules.domainterms.matchers.cosinesimilarity.config.CosineSimilarityMatcherConfig;
import com.sas.cognitive.nlu.modules.domainterms.matchers.date.config.DateMatcherConfiguration;
import com.sas.cognitive.nlu.modules.domainterms.matchers.exact.config.ExactMatcherConfiguration;
import com.sas.cognitive.nlu.modules.domainterms.matchers.lemma.config.LemmaMatcherConfiguration;
import com.sas.cognitive.nlu.modules.domainterms.matchers.number.config.NumberMatcherConfiguration;
import com.sas.cognitive.nlu.modules.domainterms.matchers.rank.config.RankMatcherConfiguration;
import com.sas.cognitive.nlu.modules.domainterms.matchers.time.config.TimeMatcherConfiguration;
import com.sas.cognitive.nlu.modules.domainterms.matchers.wordnet.config.WordNetMatcherConfig;
import com.sas.cognitive.nlu.modules.semantics.config.semanticedges.SemanticEdgeRules;

import java.io.File;

public interface AskHRBead1 {
	Lexeme Change = exactly("Change","Changes","Alter","Amend","Modify","Revise","Update");
	Lexeme BankDetails = exactly("Bank Details","Saving Account Details","Account Details","My Account");
	Lexeme Salary = exactly("Salary","Pay","Earnings","Renumeration");
	
	Lexeme Find = exactly("Find","What are","Do We Have","Where Is","What Is");
	Lexeme Procedure = exactly("Procedure","Process","Going To");
	
	Lexeme EmployeeID = exactly("Employee ID","Employee No.","Employee No","ID No.","ID No","Emp ID","Emp No.","Emp No");
	
	Lexeme Query = exactly("Query","Question");
	
	
	Lexeme MyChoice = exactly("My Choice","My Choice Portal","My Choice Benefits Portal");
	Lexeme Benefits = exactly("Benefits Portal","Benefits Submission","Benefit Submission","Benefits","Benefit","Cancelled Benefit","Flexible Benefits");
	Lexeme MyBenefits = exactly("My Benefits","My Benefit","My Benefits Choices","My Benefit Choices","My Benefits Selection");
	Lexeme Contact_MyChoice = Benefits.union(exactly("Please Contact Benefits Team Immediately"));
	
	// I have changed the name of entitled lexeme to permitted, need to check later if there is anything affected coz of this
	
	Lexeme Permitted = exactly("Entitled","Qualify","Authorized","Permitted","Granted","Getting");
	Lexeme Month = exactly("Month","Last Month","Previous month","Month ago");
	Lexeme Year = exactly("Year","This Year","Next Calendar Year","Next Financial Year");
	Lexeme UrgentAction = exactly("Urgent Action","Immediate Action","Haven't Stopped");
	Lexeme Deduction = exactly("Deduction","Deducted","Debit");
	Lexeme Contact = exactly("Contact","Ask");
	Lexeme Start = exactly("Start","Begin");
	
	Lexeme NewHire = exactly("New Hire","New Joinee","Newly Joined","New Employee","New Starters");
	Lexeme Access_Time = exactly("Access","Gain","Acquire");
	
	Lexeme ContactNo = exactly("Contact Number","Phone Number","Contact No.","Phone No.");
	Lexeme Benefits_Supplier = exactly("Benefits Supplier","GymFlex");
	
	
	Lexeme Possible_toChange = Change.union(exactly("Possible","Feasible","Viable"));
	Lexeme After = exactly("After","Following","Succeeding");
	Lexeme Deadline = exactly("Deadline","Time","How long","Time Limit","Annual Election Window");
	Lexeme Closed = exactly("Closed","End","Finished","Concluded");
	Lexeme Select = exactly("Select","Choose","Pick");
	Lexeme Stop = exactly("Stop","Stop Receiving","Terminate");
	Lexeme ChildCare_Vouchers = exactly("ChildCare Vouchers");
	Lexeme EAP = exactly("Employee Assistance Programme","EAP");
	
	Lexeme Renewed = exactly("Renewed","Extend","Prolong");
	Lexeme Gym = exactly("Gym","Gymnasium");
	Lexeme Gym_Membership = Gym.union(exactly("Membership","Joining A Gym","Gym Membership","Gymnasium Membership","Fitness Membership"));
	Lexeme Fitness_DK = exactly("Fitness DK");
	Lexeme Told = exactly("Telling","Told","Inform","Notify");
	Lexeme Expired = exactly("Expired","Lapse","Hasn't been Renewed","About To Expire","On The Verge Of");
	
	Lexeme Add = exactly("Add","Include");
	Lexeme Dependant = exactly("Dependant");
	Lexeme Private_Medical_Cover = exactly("Private Medical Cover","PMC");	
	Lexeme Email = exactly("Email","Electronic Mail");
	Lexeme AXA_PPP = exactly("AXA PPP","AXA PPP Healthcare");
	
	Lexeme Claim = exactly("Claim","Reimbursement");
	Lexeme Eye_Test = exactly("Eye Test");
	
	Lexeme Recognise = exactly("Recognise","Recognition","Acknowledge");
	Lexeme Anniversaries = exactly("Individuals Service Anniversaries","Anniversaries");
	
	// LEXEMES RELATED TO RETIREMENT
		// LEXEME ARRANGE IS NOT WORKING
	
	Lexeme Guide_Retirement = exactly("Retirement","Retiral","Retirement Gifts","Retirement Benefits","Guide To Retirement");
	Lexeme Document = exactly("Document","Doc");
	Lexeme Arrange = exactly("Arrange","Decide","Determine","Organise");
	
	
	Lexeme Setup = exactly("Set up","Setup");
	Lexeme SAS_Savings_Scheme_Account = exactly("SAS Savings Scheme Account");
	Lexeme Aviva = exactly("Aviva");

	Lexeme Rules = exactly("Rules","Regulations","Policy","Guideline","Guidelines","Directive","Rules For","Rules Around","Rules About");
	/*Lexeme Around = exactly("Around","About");*/
	Lexeme Taking = exactly("Taking");
	Lexeme Rules_BirthdayOff = exactly("Off on my birthday","Birthday Off");
	
	// Need to look in to it later
	
	Lexeme Use_E_Cigarettes = exactly("Use","Use of E-Cigarettes","Use of Electronic Cigarettes","Usage","Usage of");
	Lexeme Permitted_Inside = Permitted.union(exactly("Inside","Within"));
	Lexeme SAS = exactly("SAS Offices","SAS");
	
	Lexeme Whom = exactly("Whom","Who");
	Lexeme Send = exactly("Send");
	Lexeme Disturbance_Allowance_Claim = Claim.union(exactly("Disturbance Allowance Claim Form","Disturbance Allowance Claim"));
	
	Lexeme Dress_Code = exactly("Dress Code","Attire");
	
	Lexeme Address = exactly("Address");
	Lexeme My_Address = exactly("My Address");
	
	
	Lexeme Emergency_Contacts = Contact.union(exactly("Emergency Contacts","Emergency Contact"));
	Lexeme Work_Day = exactly("Work Day","WorkDay");
	
	// Should I make workday app from workday or not
	Lexeme Download = exactly("Download");
	Lexeme WorkDay_App = exactly("WorkDay Application","WorkDay App");
	
	
	Lexeme Employee_Name = exactly("X Employee");
	
	Lexeme Get = exactly("Get","Procure","Obtain","Have");
	Lexeme PES4_Screening = exactly("PES4 Screening");
	Lexeme Project = exactly("Project","My Project");
	
	Lexeme Expenses = exactly("Expenses","Expense","My Expenses","My Expense");
	
	Lexeme Travel_And_Expense_Policy = exactly("Travel And Expense Policy","Travel & Expense Policy");
	
	Lexeme Working_Pattern = exactly("Working Hours","Working Pattern");
	
	// Its working However have a doubt on it
	Lexeme Contractor = exactly("Contractor");
	Lexeme Provide = exactly("Provide","Give","Extend");
	Lexeme Provide_Feedback = Provide.union(exactly("Feedback","Observation"));
	
	Lexeme Remove = exactly("Remove","Delete","Erase","Eliminate","Undo","Withdraw");
	Lexeme Archive = exactly("Archive","Store","Record");
	Lexeme Goals = exactly("Goals","Goal","Aim","Objective","Target","Plan","Goal Screen","New Objectives","Last Year's Objectives","My Goals");
	
	// Goals Fairly cluttered issue- Not working
	Lexeme Introduce = exactly("Introduce","Present");
	Lexeme Alongside = exactly("Alongside","Beside");
	Lexeme Making = exactly("Making","Creating","Building");
	Lexeme View = exactly("View");
	Lexeme Fairly = exactly("Fairly","Justly","Impartially","Equitably");
	Lexeme Fairly_Cluttered = Fairly.union(exactly("Cluttered","Disarranged"));
	Lexeme Way = exactly("Way","Ways","Any Way","Any Ways");
	Lexeme Around = exactly("Around","Surrounding");
	
	// Is there a template for a discussion between a line manager and a direct report- Not working
	
	Lexeme Find_Discussion_Template = Find.union(exactly("Template For A Discussion","A Template For A Discussion"));
	/*Lexeme Discussion = exactly("Discussion","Conversation","Talk");*/
	Lexeme Between = exactly("Between");
	Lexeme Manager = exactly("A Manager","A Line Manager","My Manager");
	Lexeme Direct_Report = exactly("A Direct Report","A Direct Reportee");
	
	
	Lexeme Exporting_My_Goals = Goals.union(exactly("Exporting My Goals","Export My Goals"));
	Lexeme Excell_Spreadsheet = exactly("Excell Spreadsheet","Excell Sheet");
	
	Lexeme Leaving_SAS = SAS.union(exactly("Leaving","Resigning","Quit","Quitting"));
	Lexeme Status = exactly("Status","What Happens","What Will Happen","Will My","Still Be");
	Lexeme Validity = exactly("Valid","Viable","Validity");
	
	Lexeme Carry_Forward = exactly("Carry","Carried");
	Lexeme Holidays = exactly("Holiday","Holidays","Holiday Year","Next Holiday Year","My Holidays","My Holiday","On Holiday","On Holidays","Holiday Request","Holidays Requests","Holiday Requests");
	
	Lexeme Buy_Sell_Holidays = Holidays.union(exactly("Buy or Sell","Buy and Sell","Buying or Selling","Buying and Selling"));
	
	// LEXEMES TO BOOK A DAY OFF
	Lexeme Book = exactly("Book","Schedule","Prearrange","Book Off");
	Lexeme Day_Off = exactly("Day Off","Leave");
	Lexeme Lieu = exactly("Lieu","Instead","Rather");
	Lexeme Advance = exactly("Advance","Prior","Beforehand");
	
	Lexeme Cancel = exactly("Cancel","Postpone","Abandon","Drop");
	
	// NEED TO DECIDE WETHER TO MAKE "REQUEST" AS A SEPERATE LEXEME OR MAKE "HOLIDAY_REQUESTS"
	Lexeme Away = exactly("Away","Off","Gone","Absent");
	Lexeme Requests = exactly("Requests","Request");
	Lexeme Authorised = exactly("Authorised","Sanction","Approve","Sanctioned","Approved");
	
	Lexeme Unpaid_Leave = Day_Off.union(exactly("Unpaid"));
	
	
	
	/*
	Lexeme Deadline = exactly("Deadline","Time","How long","Time Limit");
	Lexeme Submit = exactly("Submit","Present");
	*/
		
	
	BeadElem Change(BeadElem Change);
	BeadElem BankDetails(BeadElem BankDetails);
	BeadElem Find(BeadElem Find);
	BeadElem EmployeeID();
	BeadElem Query(BeadElem Query);
	BeadElem Benefits(BeadElem Benefits);
	BeadElem Procedure(BeadElem Procedure);
	BeadElem MyBenefits(BeadElem MyBenefits);
	BeadElem UrgentAction(BeadElem UrgentAction);
	BeadElem Year();
	BeadElem Start();
	BeadElem Access_Time(BeadElem TimetoAccess);
	BeadElem Benefits_Supplier(BeadElem ContactNo);
	BeadElem Possible_toChange(BeadElem Change);
	BeadElem Select(BeadElem Flexible_Benefits);
	BeadElem Stop(BeadElem ChildCare_Vouchers);
	BeadElem Expired(BeadElem Gym_Membership);
	BeadElem Add(BeadElem PMC);
	BeadElem Contact(BeadElem AXA_PPP);
	BeadElem Claim(BeadElem Eye_Test);
	BeadElem Recognise(BeadElem Recognise);
	BeadElem Guide_Retirement();
	BeadElem Setup(BeadElem Setup);
	BeadElem Rules(BeadElem Rules);
	BeadElem Send(BeadElem Whom_To_Send);
	BeadElem Work_With(BeadElem Work_With);
	BeadElem Download(BeadElem Download);
	BeadElem Address(BeadElem Required);
	BeadElem Get(BeadElem Get);
	BeadElem Contractor(BeadElem Feedback);
	BeadElem Goals(BeadElem Goals);
	BeadElem Find_Discussion_Template(BeadElem Template);
	BeadElem Exporting_My_Goals(BeadElem Export);
	BeadElem Fitness_DK(BeadElem Membership);
	BeadElem Status(BeadElem Gym_Membership);
	BeadElem Gym_Membership(BeadElem Validity);
	BeadElem Carry_Forward(BeadElem Holidays);
	BeadElem NewHire(BeadElem Buy_Sell_Holidays);
	BeadElem Book(BeadElem Day_Off);
	BeadElem Cancel(BeadElem Holidays);
	BeadElem Holidays(BeadElem Authorised);
	
	
	// Have to look in to it later
	BeadElem Permitted_Inside(BeadElem Permitted_Inside);
	
	
	
	/*
	BeadElem Deadline(BeadElem Deadline);
	BeadElem Submit();
	*/
	
	default BeadElem Change_BankDetails()
	{
		return BankDetails(Change);
	}
	
	default BeadElem Find()
	{
		return or(Find(EmployeeID),Find(Benefits),Find(EAP),Find(Guide_Retirement),Find(Dress_Code),Find(Travel_And_Expense_Policy));
	}
	
	default BeadElem Procedure_Benefits()
	{
		return Procedure(Benefits);
	}
	
	default BeadElem Query()
	{
		return or(Query(Benefits),Query(Expenses));
	}
	
	default BeadElem UrgentAction()
	{
		return UrgentAction(Contact_MyChoice);
	}
	
	default BeadElem Benefits_Year()
	{
		return Benefits(Year);
	}
	
	default BeadElem MyBenefits_Start()
	{
		return MyBenefits(Start);
	}
	
	/* Its Not Working
	
	default BeadElem Deadline()
	{
		return Deadline(MyBenefits);
	}
	
	*/
	
	default BeadElem Access_Time()
	{
		return Access_Time(MyChoice);
	}
	
	// This one is not working for how do I get contact number for one of the benefits supplier.
	default BeadElem Benefits_Supplier()
	{
		return Benefits_Supplier(ContactNo);
	}

	
	// This Method answers- "Is it possible to change MyBenefits Selection after the Annual Election Window is Closed? "
	
	default BeadElem Possible_toChange()
	{
		return Possible_toChange(MyBenefits);
	}
	
	// WHEN CAN I SELECT FLEXIBLE BENEFITS
	
	default BeadElem Select()
	{
		return Select(Benefits);
	}
	
	// HOW CAN I STOP RECEIVING CHILDCARE VOUCHERS
	
	default BeadElem Stop()
	{
		return Stop(ChildCare_Vouchers);
	}
	
	default BeadElem Expired()
	{
		return Expired(Gym_Membership);
	}
	
	default BeadElem Add_PMC()
	{
		return Add(Private_Medical_Cover);
	}
	
	default BeadElem Contact()
	{
		return Contact(AXA_PPP);
	}
	
	default BeadElem Claim()
	{
		return Claim(Eye_Test);
	}
	
	default BeadElem Recognise()
	
	{
		return Recognise(Anniversaries);
	}
	
	// Need to look in this method again later, I Have combined this method in Find method, Scroll up
	/*
	default BeadElem Find_Guide()
	{
		return Find(Guide_Retirement);
	}
	*/
	
	default BeadElem Setup()
	{
		return Setup(SAS_Savings_Scheme_Account);
	}
	
	// Have to look in to this later as its not working
	
	default BeadElem Rules()
	{
		return Rules(Rules_BirthdayOff);
	}
	
	// Have to look in to it later, as its not working
	
	default BeadElem Permitted_Inside()
	{
		return Permitted_Inside(Use_E_Cigarettes);
	}
	
	default BeadElem Send()
	{
		return Send(Disturbance_Allowance_Claim);
	}
	
	default BeadElem Change_MyAddress()
	{
		return Change(My_Address);
	}
	
	default BeadElem Change_Working_Pattern()
	{
		return Change(Working_Pattern);
	}
	
	
	default BeadElem Add_EmergencyContacts()
	{
		return or(Add(Emergency_Contacts),Change(Emergency_Contacts),
				and(Add(Emergency_Contacts),Change(Emergency_Contacts))
				);
	}
	
	default BeadElem Download()
	{
		return Download(WorkDay_App);
	}
	
	default BeadElem Address()
	{
		return Address(Employee_Name);
	}
	
	default BeadElem Get()
	{
		return or(Get(PES4_Screening),Get(Gym_Membership),Fitness_DK(Gym_Membership),Holidays(Authorised),Get(Unpaid_Leave));
	}
	
	default BeadElem Contractor()
	{
		return Contractor(Provide_Feedback);
	}
	
	// In this "How do I remove and archive goals in workday" is not working, Also, "How do I remove or archive goals in workday" gives only archive not remove
	default BeadElem Goals()
	{
		return or(Goals(Remove),Goals(Archive),
				and(Goals(Remove),Goals(Archive))
				);
	}
	/*
	default BeadElem Fairly_Cluttered()
	{
		return Fairly_Cluttered(Goals);
	}
	*/
	
	// Have to look in to it later as its not working
	default BeadElem Find_Discussion_Template()
	{
		return and(Find_Discussion_Template(Manager),Find_Discussion_Template(Direct_Report));
	}
	
	default BeadElem Exporting_My_Goals()
	{
		return Exporting_My_Goals(Work_Day);
	}
	
	// THIS METHOD ANSWERS THE STATUS OF A GYM MEMBERSHIP & Holidays & Will the gym membership will be valid AFTER SOMEONE LEAVES THE COMPANY
	
	default BeadElem Status()
	{
		return or(Status(Gym_Membership),Gym_Membership(Validity),Status(Holidays));
	}
	
	default BeadElem Carry_Forward()
	{
		return Carry_Forward(Holidays);
	}
	
	default BeadElem NewHire()
	{
		return NewHire(Buy_Sell_Holidays);
	}
	
	// HOW TO CODE THIS FOR BOT FRAMEWORK AS IT HAS MULTIPLE ARGUMENTS PASSED
	default BeadElem Book()
	{
		return or(Book(Day_Off),Book(Holidays));
	}
	
	default BeadElem Cancel()
	{
		return Cancel(Holidays);
	}
	
	public static Lexeme exactly(String... words) {
        for (String word : words) {
            if (word.contains(",")) {
                throw new UnsupportedOperationException("Please check your punctuation");
            }
        }
        return new Lexeme(new ExactMatcherConfiguration().setCaseInsensitive(true)
                .setDataSourceConfiguration(new SimpleStringSetDataSourceConfiguration(words)));
    }
	
	public static Lexeme wordNet(String... words) {
        WordNetMatcherConfig config = new WordNetMatcherConfig();
        config.setDataSourceConfiguration(new SimpleStringSetDataSourceConfiguration(words));
        return new Lexeme(config);
    }
	
    interface MyRules extends SemanticEdgeRules {

    }
}