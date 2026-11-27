/* LiftLine app logic */
var DAYS=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
var DAY_FULL=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
var DATE_NUMS=[19,20,21,22,23,24,25];
var WINDOWS=[840,960,840,960,780,600,600];
var SPLITS={2:['Full Body A','Rest','Rest','Full Body B','Rest','Rest','Rest'],3:['Full Body A','Rest','Full Body B','Rest','Full Body C','Rest','Rest'],4:['Upper','Lower','Rest','Upper','Lower','Rest','Rest'],5:['Push','Pull','Legs','Upper','Lower','Rest','Rest'],6:['Push','Pull','Legs','Push','Pull','Legs','Rest']};
var SPLIT_NAMES={2:'2-day Full Body',3:'3-day Full Body',4:'4-day Upper / Lower',5:'5-day Push, Pull, Legs, Upper, Lower',6:'6-day Push, Pull, Legs'};
var EQ={bench:['Barbell bench press','Flat bench + barbell'],incline:['Incline dumbbell press','Adjustable bench + dumbbells'],ohp:['Seated dumbbell shoulder press','Adjustable bench + dumbbells'],lateral:['Cable lateral raise','Cable station'],pushdown:['Triceps rope pushdown','Cable station'],pulldown:['Lat pulldown','Lat pulldown machine'],row:['Seated cable row','Cable row station'],dbrow:['Chest-supported dumbbell row','Adjustable bench + dumbbells'],facepull:['Face pull','Cable station'],curl:['Dumbbell curl','Dumbbells'],squat:['Back squat','Squat rack + barbell'],rdl:['Romanian deadlift','Barbell + plates'],legpress:['Leg press','Leg press machine'],legcurl:['Seated leg curl','Leg curl machine'],calf:['Standing calf raise','Calf raise machine'],lunge:['Walking lunge','Dumbbells']};
var WORKOUTS={'Push':[['bench',4,'6-8','2:00'],['ohp',3,'8-10','1:30'],['incline',3,'10','1:30'],['lateral',3,'12-15','1:00'],['pushdown',3,'12','1:00']],'Pull':[['pulldown',4,'8-10','1:30'],['row',3,'10','1:30'],['dbrow',3,'10','1:30'],['facepull',3,'15','1:00'],['curl',3,'12','1:00']],'Legs':[['squat',4,'6-8','2:30'],['rdl',3,'8-10','2:00'],['legpress',3,'10-12','1:30'],['legcurl',3,'12','1:00'],['calf',3,'15','1:00']],'Upper':[['bench',4,'6-8','2:00'],['pulldown',4,'8-10','1:30'],['ohp',3,'10','1:30'],['row',3,'10','1:30'],['curl',2,'12','1:00']],'Lower':[['squat',4,'6-8','2:30'],['rdl',3,'8','2:00'],['lunge',3,'10 each leg','1:30'],['legcurl',3,'12','1:00'],['calf',3,'15','1:00']],'Full Body A':[['squat',3,'6-8','2:30'],['bench',3,'6-8','2:00'],['row',3,'10','1:30'],['lateral',2,'15','1:00']],'Full Body B':[['rdl',3,'8','2:00'],['ohp',3,'8-10','1:30'],['pulldown',3,'10','1:30'],['lunge',2,'10 each leg','1:30']],'Full Body C':[['legpress',3,'10-12','1:30'],['incline',3,'10','1:30'],['dbrow',3,'10','1:30'],['facepull',2,'15','1:00']]};
var CLASSES=[{id:'c1',code:'ECO 2023',name:'Microeconomics',days:[0,2],start:540,end:615},{id:'c2',code:'MAT 1093',name:'Precalculus',days:[0,2,4],start:660,end:710},{id:'c3',code:'MKT 3013',name:'Marketing',days:[1,3],start:600,end:675},{id:'c4',code:'WRC 1013',name:'Composition I',days:[1,3],start:780,end:855},{id:'c5',code:'COM 1053',name:'Business Communication',days:[4],start:540,end:590}];
var PLANS=[{id:'Roadrunner Platinum',swipes:null,dollars:300,trades:8},{id:'Roadrunner Gold',swipes:null,dollars:200,trades:5},{id:'Roadrunner Silver',swipes:null,dollars:50,trades:3},{id:'Rowdy 150',swipes:150,dollars:300,trades:5},{id:'Rowdy 120',swipes:120,dollars:400,trades:3},{id:'Rowdy 75',swipes:75,dollars:850,trades:5},{id:'No meal plan',swipes:0,dollars:0,trades:0,none:true}];
var MEALS=[
{id:'m1',place:'Panda Express',bld:'Student Union',name:'Grilled Teriyaki Chicken with Super Greens',cal:390,p:42,c:18,fiber:'n/a',pay:'trade',desc:'Grilled chicken with teriyaki sauce and steamed super greens.',allergens:'See brand guide',hours:'Opens 10:30 AM'},
{id:'m2',place:'Chick-fil-A',bld:'John Peace Library',name:'Grilled Chicken Sandwich',cal:390,p:28,c:45,fiber:'n/a',pay:'trade',desc:'Grilled chicken breast on a multigrain bun with lettuce and tomato.',allergens:'See brand guide',hours:'Opens 7:00 AM'},
{id:'m3',place:'Roadrunner Café',bld:'Dining hall',name:'Roasted Pork Loin',cal:180,p:27,c:0,fiber:'0g',pay:'swipe',desc:'Seasoned oven-roasted pork loin, 3 oz serving.',allergens:'None listed',cafe:true},
{id:'m4',place:'Roadrunner Café',bld:'Dining hall',name:'Char-Grilled Turkey Burger',cal:350,p:22,c:34,fiber:'3g',pay:'swipe',desc:'White-meat turkey burger on a soft bun, from the Flip station.',allergens:'Wheat, sesame',cafe:true},
{id:'m5',place:'Starbucks',bld:'John Peace Library',name:'Eggs and Cheddar Protein Box',cal:460,p:22,c:40,fiber:'n/a',pay:'trade',desc:'Hard-boiled eggs, cheddar, fruit and muesli bread.',allergens:'See brand guide',hours:'Hours vary'},
{id:'m6',place:'Subway',bld:'John Peace Library',name:'6-inch Oven Roasted Turkey',cal:270,p:20,c:40,fiber:'n/a',pay:'trade',desc:'Oven roasted turkey with your choice of vegetables.',allergens:'See brand guide',hours:'Hours vary'},
{id:'m7',place:'Roadrunner Café',bld:'Dining hall',name:'Cheeseburger',cal:400,p:20,c:32,fiber:'3g',pay:'swipe',desc:'All-beef burger with American cheese, from the Flip station.',allergens:'Milk, wheat, sesame',cafe:true},
{id:'m8',place:'Roadrunner Café',bld:'Dining hall',name:'Grilled Black Bean Burger',cal:260,p:17,c:47,fiber:'11g',pay:'swipe',desc:'Vegan black bean burger on a soft bun, from the Flip station.',allergens:'Wheat, soy, sesame',cafe:true}];
var CAFE_HOURS='Brunch 10 AM, dinner 5 PM';
var SCALE=['Strongly disagree','Disagree','Neutral','Agree','Strongly agree'];
var QUIZ=[
['goal','Goals','What is your main fitness goal?',['Build muscle','Lose fat','Get stronger','Improve endurance','Improve general health','Improve athletic performance','Look and feel better','Reduce stress'],'Build muscle'],
['timeline','Goals','How soon do you want to see change?',['Within 4 weeks','In 2 to 3 months','By the end of the semester','Within a year','No deadline'],'By the end of the semester'],
['trainAge','Experience','How long have you trained consistently, 2 or more times a week?',['Never','Under 3 months','3 to 12 months','1 to 3 years','Over 3 years'],'3 to 12 months'],
['recent','Experience','In the past 3 months, how many workouts did you average per week?',['0','1','2','3 to 4','5 or more'],'2'],
['barbell','Experience','How familiar are you with barbell lifts like squat, bench and deadlift?',['Never done them','Done them with help','Comfortable with light loads','Comfortable with moderate to heavy loads','Could coach others'],'Done them with help'],
['pushups','Fitness check','How many push-ups can you do in a row with good form?',['0 to 5','6 to 15','16 to 30','31 or more'],'6 to 15'],
['jog','Fitness check','How long can you jog without stopping?',['Under 5 minutes','5 to 15 minutes','15 to 30 minutes','Over 30 minutes'],'5 to 15 minutes'],
['style','Preferences','Which training style do you enjoy most?',['Weight lifting','Bodyweight and calisthenics','Mix of lifting and cardio','Functional and HIIT','Sport-based','Mobility and yoga'],'Weight lifting'],
['split','Preferences','Which workout split do you prefer?',['Full body','Upper and lower','Push, pull, legs','Body-part split','No preference'],'Upper and lower'],
['intensity','Preferences','How hard do you like workouts to feel?',['Easy and steady','Moderately challenging','Hard','Push to the limit'],'Moderately challenging'],
['avoid','Preferences','Is there an exercise you dislike or refuse?',['None','Squats','Deadlifts','Running','Jumping','Overhead pressing','Machines','Cables'],['None'],'multi','Select all that apply. These are left out of every plan.'],
['days','Schedule','How many days a week can you realistically train?',['2 days','3 days','4 days','5 days','6 days'],'4 days'],
['length','Schedule','How long can each session be?',['30 minutes','45 minutes','60 minutes','75 minutes','90 minutes or more'],'60 minutes'],
['when','Schedule','When do you usually train best?',['Early morning','Late morning','Midday','Afternoon','Evening','Late night'],'Afternoon'],
['weekends','Schedule','Can you train on weekends?',['Both days','One day','Rarely','No'],'Rarely'],
['injury','Health','Do you have a current injury or pain?',['None','Minor, rarely bothers me','Ongoing, affects some movements','Recovering from a recent injury','Restricted by a doctor'],'None'],
['area','Health','Which areas are affected?',['None','Knees','Lower back','Shoulders','Wrists or elbows','Hips','Ankles or feet','Neck'],['None'],'multi','Select all that apply. We swap out exercises that load these areas.'],
['gate','Health','Has a doctor told you to limit exercise, or do you get chest pain or dizziness when you exert yourself?',['No','Not sure','Yes'],'No',null,'Your health answers are only used to build your plan.'],
['comfort','Gym','How comfortable are you in a gym?',['Very uncomfortable','Nervous','Fine','Very comfortable'],'Fine'],
['guidance','Gym','How much exercise guidance do you want?',['Detailed cues','Short cues','Minimal'],'Short cues'],
['meals','Nutrition','How many meals do you eat per day?',['2','3','3 plus snacks','4 or more'],'3 plus snacks'],
['nutGoal','Nutrition','What is your nutrition goal?',['Lose weight','Maintain','Gain lean mass','Eat healthier overall','No preference'],'Gain lean mass'],
['numbers','Nutrition','How do you feel about calorie and macro numbers?',['Show me the numbers','Protein only','I would rather not see numbers'],'Show me the numbers'],
['sleep','Recovery','How much do you sleep on an average night?',['Under 5 hours','5 to 6 hours','6 to 7 hours','7 to 8 hours','Over 8 hours'],'6 to 7 hours'],
['stress','Recovery','How stressed are you on a typical day?',['Very high','High','Moderate','Low'],'Moderate'],
['m1','Mindset','Streaks and daily goals motivate me.',SCALE,'Agree',null,'How much do you agree?'],
['m2','Mindset','I would rather follow a set plan than choose my own exercises.',SCALE,'Agree',null,'How much do you agree?'],
['m3','Mindset','One missed workout makes me want to give up for the week.',SCALE,'Disagree',null,'How much do you agree?']];
var DIET=[{key:'restrictions',label:'How you eat',options:['Vegetarian','Vegan','Pescatarian','Halal','Kosher','Gluten-free']},{key:'allergies',label:'Allergies',options:['Peanuts or tree nuts','Dairy','Eggs','Gluten','Shellfish','Soy','Sesame']},{key:'avoid',label:'Foods you avoid',options:['Red meat','Pork','Seafood','Spicy food','Fried food']}];
var BUILD=['Reading your class schedule','Matching Rec Center equipment','Fitting workouts into free time','Building your first week'];
var CHECKIN=[{key:'overall',label:'How do you feel about your progress?',options:['1','2','3','4','5']},{key:'difficulty',label:'How have workouts felt?',options:['Too easy','About right','Too hard']},{key:'pain',label:'Any new pain or injuries?',options:['No','Yes']},{key:'schedule',label:'Has your class schedule changed?',options:['No','Yes']},{key:'goal',label:'Is your goal the same?',options:['Yes','No']}];
var HIST={1:'done',2:'done',3:'rest',4:'rest',5:'done',6:'missed',7:'rest',8:'done',9:'done',10:'rest',11:'rest',12:'done',13:'done',14:'rest',15:'done',16:'done',17:'rest',18:'rest'};
var INV='invert(1) hue-rotate(180deg)';
var OR='#FF6B2C', BL='#5B8CFF', MU='#8A93A6', LINE='rgba(255,255,255,.10)', S1='rgba(255,255,255,.04)', S2='rgba(255,255,255,.10)';
function fmt(m){var h=Math.floor(m/60),mm=m%60;return (h%12===0?12:h%12)+':'+(mm<10?'0'+mm:mm)+' '+(h>=12?'PM':'AM');}
function has(a,v){return a.indexOf(v)>=0;}
function initials(n){return n.replace(/[^A-Za-z ]/g,' ').split(' ').filter(function(w){return w;}).slice(0,2).map(function(w){return w.charAt(0).toUpperCase();}).join('');}

class Component extends DCLogic {
  constructor(props){super(props);this.state=this.fresh(props.startScreen);}
  fresh(s){
    var answers={}; QUIZ.forEach(function(q){answers[q[0]]=Array.isArray(q[4])?q[4].slice():q[4];});
    return {screen:s||'welcome',tab:'today',trainSub:'plan',todaySub:'workout',eatSub:'post',progressSub:'streak',meSub:'plan',inverted:false,menuOpen:false,dir:'r',
      email:'Test@Mail.com',password:'TESTING123',terms:false,authError:'',resent:false,
      loginEmail:'Test@Mail.com',loginPassword:'TESTING123',loginError:'',
      introIdx:0,quizStep:0,returnTo:null,answers:answers,fileName:'',classesSkipped:false,classOff:{},
      diet:{restrictions:[],allergies:[],avoid:[]},plan:'Roadrunner Gold',buildStep:0,
      streak:6,longest:9,total:23,todayDone:false,selectedDay:0,activeIdx:0,setsDone:{},moves:[],moveMsg:'',
      selectedMeal:'m4',logged:{},tradesUsed:0,swipesUsed:0,logMsg:'',
      notif:{workouts:true,streak:true},prevScreen:'app',
      checkin:{overall:'4',difficulty:'About right',pain:'No',schedule:'No',goal:'Yes'},checkinDone:false,
      forgotEmail:'Test@Mail.com',forgotSent:false};
  }
  componentDidUpdate(p){if(p.startScreen!==this.props.startScreen){clearInterval(this._iv);this.setState(this.fresh(this.props.startScreen));}}
  componentWillUnmount(){clearInterval(this._iv);}
  renderVals(){
    var self=this,st=this.state,screen=st.screen,A=st.answers;
    var SC=['welcome','signup','verify','intro','quiz','gate','upload','confirm','diet','mealplan','building','ready','app','workoutDetail','mealDetail','profile','active','complete','checkin','planUpdate','login','forgot'];
    var is={},go={};
    SC.forEach(function(k){is[k]=screen===k;go[k]=function(){self.setState({screen:k,logMsg:'',authError:'',loginError:''});};});
    go.forgot=function(){self.setState({screen:'forgot',forgotSent:false,forgotEmail:self.state.loginEmail});};
    go.profile=function(){self.setState({screen:'app',tab:'me'});};
    var toApp=function(tab,extra){self.setState(Object.assign({screen:'app',tab:tab,returnTo:null,menuOpen:false},extra||{}));};
    var goHome=function(){toApp('today');};

    // plan
    var nDays=parseInt(A.days,10)||4,len=parseInt(A.length,10)||60,plan=PLANS.filter(function(p){return p.id===st.plan;})[0]||PLANS[1];
    var split=(SPLITS[nDays]||SPLITS[4]).slice();
    st.moves.forEach(function(m){var t=split[m[0]];split[m[0]]=split[m[1]];split[m[1]]=t;});
    var wc=split.filter(function(f){return f!=='Rest';}).length;
    var openDay=function(i){self.setState({screen:'workoutDetail',selectedDay:i});};
    var week=split.map(function(f,i){var rest=f==='Rest',done=i===0&&st.todayDone,status=rest?'':(i===0?(done?'Done':'Today'):'');
      return {day:DAYS[i],focus:rest?'Rest':f,fg:rest?MU:'#F2F4F8',time:rest?'':fmt(WINDOWS[i]),detail:rest?'Recover and sleep well':WORKOUTS[f].length+' exercises · '+fmt(WINDOWS[i]),
        status:status,hasTag:!!status,tagFg:done?BL:OR,line:i===6?'transparent':'rgba(255,255,255,.07)',cursor:rest?'default':'pointer',open:rest?function(){}:function(){openDay(i);}};});

    // workout detail / active
    var sd=st.selectedDay;if(split[sd]==='Rest')sd=split.findIndex(function(f){return f!=='Rest';});
    var sf=split[sd],exList=WORKOUTS[sf].map(function(e,j,arr){var d=EQ[e[0]];return {num:j+1,name:d[0],equip:d[1],sets:e[1],reps:e[2],rest:e[3],line:j===arr.length-1?'transparent':'rgba(255,255,255,.07)'};});
    var detail={focus:sf,dayLabel:sd===0?'Today':DAY_FULL[sd],meta:exList.length+' exercises · '+len+' min · '+fmt(WINDOWS[sd])+' at the Rec Center'};
    var ai=Math.min(st.activeIdx,exList.length-1),cur=exList[ai],activeSets=[];
    for(var k=0;k<cur.sets;k++){(function(k){var key=ai+'-'+k,d=!!st.setsDone[key];activeSets.push({label:'Set '+(k+1),reps:cur.reps+' reps',pressed:d?'true':'false',bd:d?OR:LINE,bg:S1,mark:d?OR:'transparent',markBd:d?OR:'#4A5260',toggle:function(){var n=Object.assign({},self.state.setsDone);n[key]=!n[key];self.setState({setsDone:n});}});})(k);}
    var setsDoneCount=Object.keys(st.setsDone).filter(function(x){return st.setsDone[x];}).length;
    var ni=sd+1;while(ni<7&&split[ni]==='Rest')ni++;

    // today
    var tRest=split[0]==='Rest',activeClasses=st.classesSkipped?[]:CLASSES.filter(function(c){return !st.classOff[c.id];});
    var today={kicker:st.todayDone?'Done today':"Today's workout",when:tRest?'':fmt(WINDOWS[0]),focus:tRest?'':split[0],meta:tRest?'':WORKOUTS[split[0]].length+' exercises · '+len+' min · Rec Center',cta:st.todayDone?'Review workout':'View workout',open:function(){openDay(0);},isWorkout:!tRest,isRest:tRest,restNote:st.moves.length?'You moved today’s workout. Your streak is safe.':'Recover, stretch and sleep. Rest days never break your streak.'};
    var todayClasses=activeClasses.filter(function(c){return has(c.days,0);}).map(function(c,i,arr){return {code:c.code,name:c.name,start:fmt(c.start),end:fmt(c.end),line:i===arr.length-1?'transparent':'rgba(255,255,255,.07)'};});

    // eat
    var payLabel=function(m){return plan.none?'Card':(m.pay==='swipe'?'Swipe':'Meal trade');};
    var numbers=A.numbers;
    var macroOf=function(m){if(numbers==='I would rather not see numbers')return m.p>=25?'High protein':(m.c>=40?'Good carbs before training':'Balanced');if(numbers==='Protein only')return m.p+'g protein';return m.cal+' cal · '+m.p+'g protein · '+m.c+'g carbs';};
    var em=st.eatSub;
    var keyOf=function(m){if(numbers==='Protein only'||em==='post')return [m.p+'g','protein'];if(em==='pre')return [m.c+'g','carbs'];return [String(m.cal),'cal'];};
    var sorted=MEALS.slice();
    if(em==='pre')sorted.sort(function(a,b){return b.c-a.c;});else if(em==='post')sorted.sort(function(a,b){return b.p-a.p;});
    var mk=function(m,i,arr){return {name:m.name,place:m.place,bld:m.bld,isCafe:!!m.cafe,isChain:!m.cafe,initials:initials(m.place),tileBg:m.cafe?'#FFFFFF':'#1C212A',macro:macroOf(m),showKey:numbers!=='I would rather not see numbers'&&!st.logged[m.id],keyVal:keyOf(m)[0],keyLabel:keyOf(m)[1],pay:payLabel(m),payFg:m.pay==='swipe'?BL:OR,isLogged:!!st.logged[m.id],line:arr&&i===arr.length-1?'transparent':'rgba(255,255,255,.07)',open:function(){self.setState({screen:'mealDetail',selectedMeal:m.id,logMsg:''});}};};
    var meals=sorted.map(mk);
    var modeHint={pre:'Carbs first, about an hour before you train.',post:'Protein first, within two hours after you train.',regular:'Balanced picks for the rest of your day.'}[em]||'';
    var tradesLeft=Math.max(0,plan.trades-st.tradesUsed);
    var balances=[{value:plan.none?'0':(plan.swipes===null?'Unlimited':String(Math.max(0,plan.swipes-st.swipesUsed))),label:'Café swipes',line:'rgba(255,255,255,.07)'},{value:tradesLeft+' of '+plan.trades,label:'Meal trades this week',line:'rgba(255,255,255,.07)'},{value:'$'+plan.dollars,label:'Dining dollars',line:'transparent'}];
    var sm=MEALS.filter(function(m){return m.id===st.selectedMeal;})[0]||MEALS[0],smL=!!st.logged[sm.id];
    var meal=Object.assign(mk(sm),{desc:sm.desc,fiber:sm.fiber,p:sm.p,c:sm.c,cal:sm.cal,allergens:sm.allergens,hours:sm.cafe?CAFE_HOURS:sm.hours,
      cost:plan.none?'Card or cash':(sm.pay==='trade'?'1 meal trade':(plan.swipes===null?'Swipe (unlimited)':'1 meal swipe')),isLogged:smL,notLogged:!smL,
      log:function(){var s2=self.state,p=PLANS.filter(function(x){return x.id===s2.plan;})[0]||PLANS[1],u={};
        if(!p.none){if(sm.pay==='trade'){if(p.trades-s2.tradesUsed<=0){self.setState({logMsg:'No meal trades left this week. Try a Roadrunner Café pick.'});return;}u.tradesUsed=s2.tradesUsed+1;}else if(p.swipes!==null){if(p.swipes-s2.swipesUsed<=0){self.setState({logMsg:'No swipes left this semester.'});return;}u.swipesUsed=s2.swipesUsed+1;}}
        var lg=Object.assign({},s2.logged);lg[sm.id]=true;u.logged=lg;u.logMsg='Logged. Balances updated.';self.setState(u);}});
    var nm=MEALS.slice().sort(function(a,b){return b.c-a.c;})[0];
    var nextMeal={mode:'Pre-workout',name:nm.name,place:nm.place,pay:payLabel(nm),open:function(){self.setState({screen:'mealDetail',selectedMeal:nm.id,logMsg:''});}};

    // progress
    var cal=[];for(var b=0;b<3;b++)cal.push({n:'',vis:'hidden',bg:'transparent',fg:MU,border:'0',aria:''});
    for(var dn=1;dn<=31;dn++){var s=HIST[dn];if(dn===19)s=st.todayDone?'done':'today';var c={n:String(dn),vis:'visible',bg:'transparent',fg:'#6B7482',border:'0',aria:'October '+dn};
      if(s==='done'){c.bg=OR;c.fg='#1A0A03';c.aria+=', done';}if(s==='missed'){c.border='1.5px solid '+BL;c.fg='#F2F4F8';c.aria+=', missed';}if(s==='rest'){c.bg='#1C212A';c.fg=MU;c.aria+=', rest';}if(s==='today'){c.border='1.5px solid #EEF1F5';c.fg='#F2F4F8';c.aria+=', today';}cal.push(c);}
    var seg=function(list,curv,key){return list.map(function(x){var on=curv===x[0],u={};u[key]=x[0];return {label:x[1],sel:on?'true':'false',bg:on?S2:'transparent',fg:on?'#F2F4F8':MU,pick:function(){self.setState(u);}};});};

    // setup form
    var SETUP={quiz:['About you',1],upload:['Your classes',2],confirm:['Your classes',2],diet:['Food',3],mealplan:['Food',3]};
    var isSetupForm=!!SETUP[screen],editing=!!st.returnTo,backToProfile=function(){self.setState({screen:'app',tab:'me',returnTo:null});};
    var q=QUIZ[st.quizStep],multi=q[5]==='multi',ans=A[q[0]];
    var setup={label:'',stepText:'',pct:0,editing:editing,done:backToProfile,back:function(){},next:function(){},cta:'',enabled:true,disabled:false};
    if(isSetupForm){var inf=SETUP[screen];setup.label=editing?'Edit':inf[0];setup.stepText=editing?'':'Step '+inf[1]+' of 3';
      setup.pct=is.quiz?Math.round((st.quizStep+1)/QUIZ.length*100):(is.upload?10:is.confirm?60:is.diet?40:90);
      if(is.quiz){setup.stepText=(st.quizStep+1)+' of '+QUIZ.length;
        setup.back=function(){if(self.state.quizStep>0)self.setState({quizStep:self.state.quizStep-1});else if(editing)backToProfile();else self.setState({screen:'intro'});};
        setup.cta=st.quizStep<QUIZ.length-1?'Next':(editing?'Save':'Continue');
        setup.next=function(){var s2=self.state;if(QUIZ[s2.quizStep][0]==='gate'&&s2.answers.gate!=='No'&&!s2.cleared){self.setState({screen:'gate'});return;}if(s2.quizStep<QUIZ.length-1)self.setState({quizStep:s2.quizStep+1});else if(editing)backToProfile();else self.setState({screen:'upload'});};}
      if(is.upload){setup.back=function(){if(editing)backToProfile();else self.setState({screen:'quiz',quizStep:QUIZ.length-1});};setup.cta=st.fileName?'Scan schedule':'Choose a PDF first';setup.enabled=!!st.fileName;setup.disabled=!st.fileName;setup.next=function(){self.setState({screen:'confirm',classesSkipped:false});};}
      if(is.confirm){setup.back=function(){self.setState({screen:'upload'});};setup.cta=editing?'Save':'Looks right';setup.next=function(){if(editing)backToProfile();else self.setState({screen:'diet'});};}
      if(is.diet){setup.back=function(){if(editing)backToProfile();else self.setState({screen:'confirm'});};setup.cta=editing?'Save':'Next';setup.next=function(){if(editing)backToProfile();else self.setState({screen:'mealplan'});};}
      if(is.mealplan){setup.back=function(){if(editing)backToProfile();else self.setState({screen:'diet'});};setup.cta=editing?'Save':'Build my plan';
        setup.next=function(){if(self.state.returnTo){self.setState({tradesUsed:0,swipesUsed:0,logged:{}});backToProfile();return;}clearInterval(self._iv);self.setState({screen:'building',buildStep:0});
          self._iv=setInterval(function(){var n=self.state.buildStep+1;if(n>=BUILD.length){clearInterval(self._iv);self.setState({buildStep:BUILD.length});setTimeout(function(){if(self.state.screen==='building')self.setState({screen:'ready'});},500);}else self.setState({buildStep:n});},700);};}}
    var quiz={section:q[1],title:q[2],note:q[6]||'',hasNote:!!q[6],options:q[3].map(function(o){var sel=multi?has(ans,o):ans===o;
      return {label:o,pressed:sel?'true':'false',bd:sel?OR:LINE,bg:sel?'#1E1712':S1,mark:sel?OR:'transparent',markBd:sel?OR:'#4A5260',radius:multi?'5px':'10px',
        pick:function(){var a=Object.assign({},self.state.answers);if(multi){var l=a[q[0]].slice();if(o==='None')l=['None'];else{l=l.filter(function(x){return x!=='None';});l=has(l,o)?l.filter(function(x){return x!==o;}):l.concat([o]);if(!l.length)l=['None'];}a[q[0]]=l;}else a[q[0]]=o;
          var u={answers:a};if(q[0]==='gate')u.cleared=false;self.setState(u);}};})};
    var classRows=CLASSES.map(function(c){var off=!!st.classOff[c.id];return {code:c.code,name:c.name,when:c.days.map(function(d){return DAYS[d];}).join(', ')+' · '+fmt(c.start)+' to '+fmt(c.end),pressed:off?'false':'true',tag:off?'Removed':'Keep',tagFg:off?MU:BL,op:off?'.55':'1',strike:off?'line-through':'none',toggle:function(){var o=Object.assign({},self.state.classOff);o[c.id]=!o[c.id];self.setState({classOff:o});}};});
    var dietSections=DIET.map(function(sec){return {label:sec.label,options:sec.options.map(function(opt){var on=has(st.diet[sec.key],opt);return {label:opt,pressed:on?'true':'false',bg:on?'#F2F4F8':'transparent',fg:on?'#1A0A03':'#F2F4F8',bd:on?'#F2F4F8':LINE,pick:function(){var dd=JSON.parse(JSON.stringify(self.state.diet)),l=dd[sec.key];dd[sec.key]=has(l,opt)?l.filter(function(x){return x!==opt;}):l.concat([opt]);self.setState({diet:dd});}};})};});
    var planRows=PLANS.map(function(p){var on=st.plan===p.id;return {name:p.id,desc:p.none?'Commuter or paying per meal':(p.swipes===null?'Unlimited café meals':p.swipes+' café meals per semester')+' · $'+p.dollars+' dining dollars · '+p.trades+' trades a week',pressed:on?'true':'false',bd:on?OR:LINE,bg:on?'#1E1712':S1,mark:on?OR:'transparent',markBd:on?OR:'#4A5260',pick:function(){self.setState({plan:p.id});}};});

    // intro
    var INTRO=[['Train','Plans built for your gym','Every exercise uses equipment the Rec Center has, scheduled into the gaps between your classes.'],['Eat','Meals that fit your plan','Picks from campus dining, sorted for before or after training, labeled swipe or meal trade.'],['Stay','Keep showing up','A simple streak and calendar. Rest days never break it, and missed workouts can be moved.']];
    var ii=st.introIdx,intro={num:'0'+(ii+1),title:INTRO[ii][1],body:INTRO[ii][2],last:ii===2,pos:'Card '+(ii+1)+' of 3',cta:ii===2?'Start questionnaire':'Next',dots:INTRO.map(function(x,i){return {w:i===ii?20:6,bg:i===ii?OR:'#343B47'};})};
    var startQuiz=function(){self.setState({screen:'quiz',quizStep:0,returnTo:null});};

    // profile
    var dietAll=[].concat(st.diet.restrictions,st.diet.allergies,st.diet.avoid);
    var edit=function(sc,extra){return function(){self.setState(Object.assign({screen:sc,returnTo:'profile'},extra||{}));};};
    var profileGroups=[
      {title:'Your plan',rows:[{label:'Questionnaire answers',sub:A.goal+' · '+A.days+' · '+A.length,open:edit('quiz',{quizStep:0})},{label:'Class schedule',sub:activeClasses.length?activeClasses.length+' classes':'No classes added',open:edit('upload',{fileName:''})}]},
      {title:'Food',rows:[{label:'Dietary preferences',sub:dietAll.length?dietAll.join(', '):'No restrictions',open:edit('diet')},{label:'Meal plan',sub:plan.id,open:edit('mealplan')}]}];
    var sw=function(label,sub,on,fn){return {label:label,sub:sub,pressed:on?'true':'false',track:on?OR:'#343B47',knob:on?21:3,toggle:fn};};
    var switches=[
      sw('Invert colors','Light background with dark text',st.inverted,function(){self.setState({inverted:!self.state.inverted});}),
      sw('Workout reminders','Before your workout window',st.notif.workouts,function(){var n=Object.assign({},self.state.notif);n.workouts=!n.workouts;self.setState({notif:n});}),
      sw('Streak alerts','When your streak is at risk',st.notif.streak,function(){var n=Object.assign({},self.state.notif);n.streak=!n.streak;self.setState({notif:n});})];

    // check-in
    var ci=st.checkin,checkinQs=CHECKIN.map(function(cq){return {label:cq.label,options:cq.options.map(function(o){var on=ci[cq.key]===o;return {label:o,pressed:on?'true':'false',bg:on?'#F2F4F8':'transparent',fg:on?'#1A0A03':'#F2F4F8',bd:on?'#F2F4F8':LINE,pick:function(){var c2=Object.assign({},self.state.checkin);c2[cq.key]=o;self.setState({checkin:c2});}};})};});
    var CH={tag:'Changed',tagFg:OR},KP={tag:'Same',tagFg:MU},changes=[];
    changes.push(ci.difficulty==='Too easy'?Object.assign({title:'More challenge',body:'One extra set on main lifts.'},CH):ci.difficulty==='Too hard'?Object.assign({title:'Lighter volume',body:'One set less on accessory lifts.'},CH):Object.assign({title:'Steady progress',body:'One more rep on main lifts.'},CH));
    changes.push(ci.pain==='Yes'?Object.assign({title:'Exercise swaps',body:'Gentler options where it might hurt. Update your injuries in Me.'},CH):Object.assign({title:'Exercises',body:'No swaps needed.'},KP));
    changes.push(ci.schedule==='Yes'?Object.assign({title:'Workout times',body:'Upload your new schedule in Me.'},CH):Object.assign({title:'Workout times',body:'No change.'},KP));
    changes.push(ci.goal==='No'?Object.assign({title:'Goal',body:'Update your goal in Me to rebuild the split.'},CH):Object.assign({title:'Goal',body:A.goal+'.'},KP));

    // shell
    var shellScreens={app:1,workoutDetail:1,mealDetail:1},inShell=!!shellScreens[screen];
    var navTab=screen==='workoutDetail'?'train':screen==='mealDetail'?'eat':st.tab;
    var inApp=screen==='app',T=st.tab;
    var view={today:inApp&&T==='today',train:inApp&&T==='train',eat:inApp&&T==='eat',progress:inApp&&T==='progress',me:inApp&&T==='me',workoutDetail:is.workoutDetail,mealDetail:is.mealDetail};
    var headers={today:['Monday, Oct 19','Today'],train:[SPLIT_NAMES[nDays],'This week'],eat:[plan.id,'Eat'],progress:['October','Progress'],me:[st.email,'Me']};
    var SUBS={today:['todaySub',[['workout','Workout'],['meal','Next meal'],['classes','Classes']]],eat:['eatSub',[['pre','Pre-workout'],['post','Post-workout'],['regular','Regular'],['balances','Balances']]],progress:['progressSub',[['streak','Streak'],['calendar','Calendar'],['stats','Stats']]],me:['meSub',[['plan','Plan'],['food','Food'],['settings','Settings']]]};
    var subDef=SUBS[T],subTabs=subDef?subDef[1].map(function(x){var on=st[subDef[0]]===x[0],u={};u[subDef[0]]=x[0];return {label:x[1],sel:on?'true':'false',fg:on?'#F2F4F8':'#6B7482',line:on?OR:'transparent',pick:function(){self.setState(u);}};}):[];
    var sub={todayWorkout:view.today&&st.todaySub==='workout',todayMeal:view.today&&st.todaySub==='meal',todayClasses:view.today&&st.todaySub==='classes',
      eatMeals:view.eat&&em!=='balances',eatBalances:view.eat&&em==='balances',progStreak:view.progress&&st.progressSub==='streak',progCalendar:view.progress&&st.progressSub==='calendar',progStats:view.progress&&st.progressSub==='stats',
      meList:view.me&&st.meSub!=='settings',meSettings:view.me&&st.meSub==='settings'};
    var meRows=st.meSub==='food'?profileGroups[1].rows:profileGroups[0].rows;
    var tabs=[['today','Today'],['train','Train'],['eat','Eat'],['progress','Progress'],['me','Me']].map(function(t){var on=navTab===t[0];return {label:t[1],cur:on?'page':'false',fg:on?'#F2F4F8':'#6B7482',dot:on?OR:'transparent',go:function(){toApp(t[0]);}};});


    // ===== minimal skin =====
    var O='#FF6B2C',W='#F5F5F7',DIM='#5C606B',MID='#8B8F9A',GLO='0 0 10px rgba(255,107,44,.95)',HAIR='rgba(255,255,255,.14)';
    var pad=function(n){return n<10?'0'+n:String(n);};
    var X={};
    intro.kicker=INTRO[ii][0];intro.pos=pad(ii+1)+' / 03';intro.dots.forEach(function(d,i){d.w=i===ii?28:10;d.bg=i===ii?O:'rgba(255,255,255,.15)';});
    setup.notEditing=!editing;setup.counter=is.quiz?pad(st.quizStep+1)+' / '+QUIZ.length:setup.stepText;
    var pick=function(o,on){o.fg=on?W:MID;o.dot=on?O:'transparent';o.dotBd=on?O:'rgba(255,255,255,.25)';o.glow=on?GLO:'none';};
    quiz.options.forEach(function(o){pick(o,o.pressed==='true');});
    planRows.forEach(function(p){pick(p,p.pressed==='true');});
    var chip=function(c,on){c.bd=on?'rgba(255,107,44,.7)':HAIR;c.fg=on?W:MID;c.dot=on?O:'rgba(255,255,255,.2)';c.glow=on?GLO:'none';};
    dietSections.forEach(function(sc){sc.options.forEach(function(c){chip(c,c.pressed==='true');});});
    checkinQs.forEach(function(q2){q2.options.forEach(function(c){chip(c,c.pressed==='true');});});
    week.forEach(function(w,i){var rest=w.focus==='Rest',td=i===0;w.dayFg=td?O:DIM;w.fg=rest?'#3E424C':W;w.dot=td?O:(rest?'transparent':'rgba(255,255,255,.35)');w.glow=td?GLO:'none';w.right=w.hasTag?w.status:(rest?'':w.time);w.tagFg=w.hasTag?w.tagFg:DIM;});
    var SHORT={'Workout':'Session','Next meal':'Meal','Classes':'Classes','Pre-workout':'Pre','Post-workout':'Post','Regular':'Day','Balances':'Wallet','Streak':'Streak','Calendar':'Month','Stats':'Stats','Plan':'Plan','Food':'Food','Settings':'Settings'};
    subTabs.forEach(function(sb){var on=sb.sel==='true';sb.label=SHORT[sb.label]||sb.label;sb.fg=on?W:DIM;sb.dot=on?O:'transparent';sb.glow=on?GLO:'none';});
    var foc=today.focus||'';today.focusSize=foc.length>9?50:(foc.length>6?62:84);today.short=tRest?'':WORKOUTS[split[0]].length+' exercises · '+len+' minutes';
    X.streakPad=pad(st.streak);
    X.ring={streak:(879.65*(1-Math.min(1,st.streak/Math.max(st.longest,1)))).toFixed(1)};
    nextMeal.key=nm.c+'g';nextMeal.keyLabel='Carbs';
    X.toBeat=Math.max(0,st.longest-st.streak+1);
    cal.forEach(function(c){c.size=4;c.bg='rgba(255,255,255,.1)';c.border='0';c.glow='none';c.anim='none';
      if(/done$/.test(c.aria)){c.size=11;c.bg=O;c.glow='0 0 12px rgba(255,107,44,.9)';}
      else if(/rest$/.test(c.aria)){c.size=4;c.bg='rgba(255,255,255,.35)';}
      else if(/missed$/.test(c.aria)){c.size=11;c.bg='transparent';c.border='1px solid #5B8CFF';c.glow='0 0 8px rgba(91,140,255,.6)';}
      else if(/today$/.test(c.aria)){c.size=11;c.bg='transparent';c.border='1px solid #F5F5F7';c.anim='pulse 1.8s ease-in-out infinite';}});
    X.stats=[{label:'Workouts',value:String(st.total)},{label:'This week',value:(st.todayDone?1:0)+'/'+wc},{label:'Longest streak',value:String(st.longest)}];
    X.eatTitle={pre:'Before training',post:'After training',regular:'Any time'}[em]||'Eat';
    var hideNum=numbers==='I would rather not see numbers';
    meals.forEach(function(m){if(hideNum)m.keyVal='';m.keyFg=m.isLogged?DIM:O;m.payFg=m.pay==='Swipe'?'#7FA6FF':'#FF8F5C';});
    if(!meal.isCafe)meal.tileBg='rgba(255,255,255,.08)';
    balances.forEach(function(bb,i){bb.fg=i===1?O:W;bb.note=['Semester','Resets Monday','Semester'][i];});
    switches.forEach(function(n){var on=n.pressed==='true';n.bd=on?'transparent':'rgba(255,255,255,.2)';n.track=on?O:'transparent';n.glow=on?'0 0 16px rgba(255,107,44,.6)':'none';n.knob=on?23:3;n.knobBg=on?'#1A0A03':'#8B8F9A';});
    exList.forEach(function(e){e.numPad=pad(e.num);});
    detail.size=sf.length>9?44:(sf.length>6?54:72);
    X.menuOpen=!!st.menuOpen;X.openMenu=function(){self.setState({menuOpen:true});};X.closeMenu=function(){self.setState({menuOpen:false});};
    var DESC=['Session · next meal · classes','Your week','Meals and balances','Streak and history','Plan · food · settings'];
    tabs.forEach(function(t,i){var on=t.cur==='page';t.idx=pad(i+1);t.fg=on?O:W;t.glow=on?'0 0 40px rgba(255,107,44,.6)':'none';t.sub=DESC[i];t.delay=String(i*50);});

    var curSub=subDef?subDef[1].findIndex(function(x){return st[subDef[0]]===x[0];}):-1;
    var goSub=function(n){if(!subDef||n<0||n>=subDef[1].length||n===curSub)return;var u={dir:n>curSub?'r':'l'};u[subDef[0]]=subDef[1][n][0];self.setState(u);};
    subTabs.forEach(function(sb,i){sb.pick=function(){goSub(i);};});
    X.swStart=function(e){self._sx=e.clientX;self._sy=e.clientY;};
    X.swEnd=function(e){if(self._sx==null||!view[T])return;var dx=e.clientX-self._sx,dy=e.clientY-self._sy;self._sx=null;if(Math.abs(dx)>60&&Math.abs(dy)<50)goSub(curSub+(dx<0?1:-1));};
    var TORD=['today','train','eat','progress','me'];
    tabs.forEach(function(t,i){t.go=function(){var ci=TORD.indexOf(self.state.tab);toApp(TORD[i],{dir:i>=ci?'r':'l'});};});
    X.anim=(view.workoutDetail||view.mealDetail)?'zoomIn':(st.dir==='l'?'slideL':'slideR');
    X.activeReps=cur.reps;
    activeSets.forEach(function(sx,i){var on=sx.pressed==='true';sx.n=String(i+1);sx.bd=on?'transparent':'rgba(255,255,255,.2)';sx.bg=on?'radial-gradient(circle at 34% 28%,#FFC09A,#FF6B2C 50%,#C8410F)':'transparent';sx.glow=on?'0 0 30px rgba(255,107,44,.7)':'none';sx.fg=on?'#1A0A03':W;});
    var RV={appName:this.props.appName||'LiftLine',is:is,go:go,goHome:goHome,inv:st.inverted?INV:'none',imgFilter:st.inverted?INV:'none',
      email:st.email,password:st.password,onEmail:function(e){self.setState({email:e.target.value});},onPassword:function(e){self.setState({password:e.target.value});},
      terms:{pressed:st.terms?'true':'false',bg:st.terms?OR:'transparent',bd:st.terms?OR:'#4A5260',toggle:function(){self.setState({terms:!self.state.terms});}},
      authError:st.authError,hasAuthError:!!st.authError,
      signUp:function(){var s2=self.state,em=s2.email.trim().toLowerCase();if(!(em==='test@mail.com'||/@(my\.)?utsa\.edu$/.test(em))){self.setState({authError:'Use your UTSA email address.'});return;}if(s2.password.length<8){self.setState({authError:'Password needs at least 8 characters.'});return;}if(!s2.terms){self.setState({authError:'Please agree to the Terms to continue.'});return;}self.setState({screen:'verify',authError:'',resent:false});},
      resent:st.resent,resend:function(){self.setState({resent:true});},
      loginEmail:st.loginEmail,loginPassword:st.loginPassword,loginError:st.loginError,hasLoginError:!!st.loginError,
      onLoginEmail:function(e){self.setState({loginEmail:e.target.value});},onLoginPassword:function(e){self.setState({loginPassword:e.target.value});},
      logIn:function(){var s2=self.state;if(s2.loginEmail.trim().toLowerCase()==='test@mail.com'&&s2.loginPassword==='TESTING123')toApp('today',{loginError:''});else self.setState({loginError:"That email and password don't match."});},
      logout:function(){self.setState({screen:'login'});},
      forgotEmail:st.forgotEmail,forgotSent:st.forgotSent,forgotNotSent:!st.forgotSent,onForgotEmail:function(e){self.setState({forgotEmail:e.target.value});},sendReset:function(){self.setState({forgotSent:true});},
      intro:intro,introNext:function(){if(self.state.introIdx<2)self.setState({introIdx:self.state.introIdx+1});else startQuiz();},startQuiz:startQuiz,
      isSetupForm:isSetupForm,setup:setup,quiz:quiz,
      gateCleared:function(){var i=QUIZ.findIndex(function(x){return x[0]==='gate';});self.setState({screen:self.state.returnTo?'quiz':'quiz',quizStep:i+1,cleared:true});},
      gateChange:function(){var i=QUIZ.findIndex(function(x){return x[0]==='gate';});self.setState({screen:'quiz',quizStep:i});},
      fileName:st.fileName,hasFile:!!st.fileName,chooseFile:function(){self.setState({fileName:'Fall-2026-schedule.pdf'});},
      skipUpload:function(){if(self.state.returnTo)backToProfile();else self.setState({screen:'diet',classesSkipped:true});},
      classRows:classRows,foundCount:CLASSES.length+' classes',dietSections:dietSections,planRows:planRows,
      build:{pct:Math.round(st.buildStep/BUILD.length*100),items:BUILD.map(function(l,i){var d=i<st.buildStep;return {label:l,fg:d?'#F2F4F8':(i===st.buildStep?'#C4CAD3':'#4A5260'),dot:d?OR:(i===st.buildStep?'#F2F4F8':'#343B47')};})},
      plan:{splitTitle:SPLIT_NAMES[nDays],meta:wc+' workouts a week · '+len+' min · '+A.goal},week:week,
      inShell:inShell,view:view,tabs:tabs,showTabHeader:screen==='app',header:{sub:headers[st.tab][0],title:headers[st.tab][1]},
      streak:st.streak,longest:st.longest,total:st.total,thisWeek:(st.todayDone?1:0)+' of '+wc,
      today:today,todayClasses:todayClasses,hasClasses:todayClasses.length>0,noClasses:todayClasses.length===0,
      noClassesText:st.classesSkipped?'No classes added yet. Upload your schedule in Me.':'No classes today.',
      showCheckin:!st.checkinDone,nextMeal:nextMeal,openProgress:function(){toApp('progress',{progressSub:'streak'});},
      sub:sub,subTabs:subTabs,hasSubTabs:subTabs.length>0,meRows:meRows,seeMeals:function(){toApp('eat',{eatSub:'pre'});},
      trainSegs:seg([['plan','This week'],['progress','Progress']],st.trainSub,'trainSub'),trainIs:{plan:true,progress:false},
      calCells:cal,weekLetters:DAYS.map(function(d){return {t:d.charAt(0)};}),
      moveMsg:st.moveMsg,hasMoveMsg:!!st.moveMsg,
      balances:balances,modeHint:modeHint,meals:meals,meal:meal,logMsg:st.logMsg,hasLogMsg:!!st.logMsg,backToEat:function(){toApp('eat',{dir:'l'});},
      detail:detail,exList:exList,backToTrain:function(){toApp('train',{trainSub:'plan',dir:'l'});},
      startWorkout:function(){self.setState({screen:'active',activeIdx:0,setsDone:{}});},
      moveWorkout:function(){var r=sd+1;while(r<7&&split[r]!=='Rest')r++;if(r>=7){toApp('train',{trainSub:'plan',moveMsg:'No free day left this week. Try a shorter session instead.'});return;}
        toApp('train',{trainSub:'plan',moves:self.state.moves.concat([[sd,r]]),moveMsg:sf+' moved to '+DAY_FULL[r]+'. Your streak is safe.'});},
      active:{pos:(ai+1)+' of '+exList.length,pct:Math.round((ai+1)/exList.length*100),name:cur.name,equip:cur.equip,rest:cur.rest,isLast:ai===exList.length-1,notLast:ai!==exList.length-1,notFirst:ai!==0},
      activeSets:activeSets,endWorkout:function(){self.setState({screen:'workoutDetail'});},
      activeNext:function(){self.setState({activeIdx:ai+1});},activePrev:function(){self.setState({activeIdx:Math.max(0,ai-1)});},
      finishWorkout:function(){var s2=self.state;if(sd!==0||s2.todayDone){self.setState({screen:'complete'});return;}var n=s2.streak+1;self.setState({screen:'complete',todayDone:true,streak:n,longest:Math.max(s2.longest,n),total:s2.total+1});},
      setsDoneCount:setsDoneCount,exCount:exList.length,nextSession:ni<7?split[ni]+' on '+DAY_FULL[ni]:'next week',
      planName:plan.id,profileGroups:profileGroups,switches:switches,goBackFromProfile:function(){var p=self.state.prevScreen;self.setState({screen:shellScreens[p]?p:'app'});},
      checkinQs:checkinQs,changes:changes,submitCheckin:function(){self.setState({screen:'planUpdate',checkinDone:true});}};
    RV.terms.bg=st.terms?O:'transparent';RV.terms.bd=st.terms?O:'rgba(255,255,255,.3)';RV.terms.glow=st.terms?GLO:'none';var bp=RV.build.pct;RV.build.off=(753.98*(1-bp/100)).toFixed(1);RV.build.items.forEach(function(bi,i){bi.fg=i<st.buildStep?W:(i===st.buildStep?MID:'#3E424C');bi.dot=i<st.buildStep?O:(i===st.buildStep?W:'#3E424C');bi.glow=i<st.buildStep?GLO:'none';});RV.noSubTabs=!RV.hasSubTabs;
    return Object.assign(RV,X);
  }
}

LiftLineRuntime.mount(Component,{appName:"LiftLine",startScreen:"welcome"});
