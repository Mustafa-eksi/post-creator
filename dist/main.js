(()=>{var r={332:function(r,e,t){r=t.nmd(r),function(e){function o(r,o,a){"use strict";var i={font:"18px Arial, sans-serif",sizeToFill:!1,maxFontSizeToFill:!1,lineHeight:1,allowNewLine:!0,lineBreak:"auto",textAlign:"left",verticalAlign:"top",justifyLines:!1,paddingX:0,paddingY:0,fitParent:!1,strokeText:!1,renderHDPI:!0,textDecoration:"none"},n={};for(var s in i)n[s]=a.hasOwnProperty(s)?a[s]:i[s];var l=r.getContext("2d");l.font=n.font,l.textBaseline="bottom";var c=1,d=void 0!==t.g?t.g.devicePixelRatio:e.devicePixelRatio;if(n.renderHDPI&&d>1){var u={};for(var s in l)u[s]=l[s];var p=r.width,m=r.height;for(var s in c=d,r.width=p*c,r.height=m*c,r.style.width=p*c*.5+"px",r.style.height=m*c*.5+"px",u)try{l[s]=u[s]}catch(r){}l.scale(c,c)}var g,b=(n.fitParent?r.parentNode.clientWidth:r.width)/c,h=(n.fitParent?r.parentNode.clientHeight:r.height)/c,f=b-2*n.paddingX,y=h-2*n.paddingY,v=n.font.match(/\d+(px|em|%)/g)?+n.font.match(/\d+(px|em|%)/g)[0].match(/\d+/g):18,w=0,A=[],C=[],k={x:0,y:0},B=0;function x(r){g||(g=n.sizeToFill?l.font.split(/\b\d+px\b/i):n.font.split(/\b\d+px\b/i)),l.font=g[0]+r+"px"+g[1]}function T(r){x(r),B=r,_()}function _(){if(n.allowNewLine)for(var r=o.trim().split("\n"),e=0,t=0;e<r.length-1;e++)t+=r[e].trim().split(/\s+/).length,C.push(t);var a=o.trim().split(/\s+/);!function(r){var e,t,o;r.forEach((function(a,i){if(e="",l.measureText(a).width>f){for(var n=0;l.measureText(e+a[n]).width<=f&&n<a.length;n++)e+=a[n];t=a.slice(0,n),o=a.slice(n),r.splice(i,1,t,o)}}))}(a),function(r){A=[];for(var e=0,t=0;e<r.length;t++)if(A[t]="","auto"===n.lineBreak){if(l.measureText(A[t]+r[e]).width>f)break;for(;l.measureText(A[t]+r[e]).width<=f&&e<r.length;)if(A[t]+=r[e]+" ",e++,n.allowNewLine)for(var o=0;o<C.length;o++)if(C[o]===e){t++,A[t]="";break}A[t]=A[t].trim()}else A[t]=r[e],e++}(a),w=A.length*B}function P(r,e,t){var o=l.measureText(r).width;switch(l.textAlign){case"center":e-=o/2;break;case"right":e-=o}l.beginPath(),l.moveTo(e,t),l.lineTo(e+o,t),l.stroke()}return o=function(r){do{r=r.replace(/\n\n/g,"\n​\n")}while(r.indexOf("\n\n")>-1);return r}(o),x(v),isNaN(n.lineHeight)?-1!==n.lineHeight.toString().indexOf("px")?B=parseInt(n.lineHeight):-1!==n.lineHeight.toString().indexOf("%")&&(B=parseInt(n.lineHeight)/100*v):B=v*n.lineHeight,function(){if("string"!=typeof o)throw new TypeError("The second parameter must be a String.");if(isNaN(v))throw new TypeError('Cannot parse "font".');if(isNaN(B))throw new TypeError('Cannot parse "lineHeight".');if("left"!==n.textAlign.toLocaleLowerCase()&&"center"!==n.textAlign.toLocaleLowerCase()&&"right"!==n.textAlign.toLocaleLowerCase())throw new TypeError('Property "textAlign" must be set to either "left", "center", or "right".');if("top"!==n.verticalAlign.toLocaleLowerCase()&&"middle"!==n.verticalAlign.toLocaleLowerCase()&&"bottom"!==n.verticalAlign.toLocaleLowerCase())throw new TypeError('Property "verticalAlign" must be set to either "top", "middle", or "bottom".');if("boolean"!=typeof n.justifyLines)throw new TypeError('Property "justifyLines" must be a Boolean.');if(isNaN(n.paddingX))throw new TypeError('Property "paddingX" must be a Number.');if(isNaN(n.paddingY))throw new TypeError('Property "paddingY" must be a Number.');if("boolean"!=typeof n.fitParent)throw new TypeError('Property "fitParent" must be a Boolean.');if("auto"!==n.lineBreak.toLocaleLowerCase()&&"word"!==n.lineBreak.toLocaleLowerCase())throw new TypeError('Property "lineBreak" must be set to either "auto" or "word".');if("boolean"!=typeof n.sizeToFill)throw new TypeError('Property "sizeToFill" must be a Boolean.');if("boolean"!=typeof n.strokeText)throw new TypeError('Property "strokeText" must be a Boolean.');if("boolean"!=typeof n.renderHDPI)throw new TypeError('Property "renderHDPI" must be a Boolean.');if("none"!==n.textDecoration.toLocaleLowerCase()&&"underline"!==n.textDecoration.toLocaleLowerCase())throw new TypeError('Property "textDecoration" must be set to either "none" or "underline".')}(),function(){if(n.sizeToFill){var r=o.trim().split(/\s+/).length,e=0,t=!1!==n.maxFontSizeToFill;do{if(t){if(!(++e<=n.maxFontSizeToFill))break;T(e)}else T(++e)}while(w<y&&A.join(" ").split(/\s+/).length==r);T(--e)}else _();n.justifyLines&&"auto"===n.lineBreak&&function(){for(var r,e,t,o,a,i,n,s=0;s<A.length;s++)t=l.measureText(A[s]).width,(!r||t>r)&&(r=t,e=s);var c=" ";for(s=0;s<A.length;s++)if(s!==e&&!((o=A[s].trim().split(/\s+/).length)<=1)){A[s]=A[s].trim().split(/\s+/).join(c),a=l.measureText(c).width,i=(r-l.measureText(A[s]).width)/a/(o-1),n="";for(var d=0;d<i;d++)n+=c;A[s]=A[s].trim().split(c).join(n)}}(),"middle"==n.verticalAlign?k.y=(h-w)/2:"bottom"==n.verticalAlign?k.y=h-w-n.paddingY:k.y=n.paddingY,l.textAlign=n.textAlign,"center"==n.textAlign?k.x=b/2:"right"==n.textAlign?k.x=b-n.paddingX:k.x=n.paddingX,function(){for(var r=0;r<A.length;r++)k.y=parseInt(k.y)+B,"​ "!==A[r]&&(l.fillText(A[r],k.x,k.y),n.strokeText&&l.strokeText(A[r],k.x,k.y),"underline"===n.textDecoration.toLocaleLowerCase()&&P(A[r],k.x,k.y))}()}(),A}"module"in e&&"exports"in r?r.exports=o:e.CanvasTextWrapper=o}(this)},750:(r,e,t)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0});const o=t(105),a=t(741);e.default=async function(r){return"string"==typeof(null==r?void 0:r.subReddit)&&(r.subReddit=void 0),await(0,a.default)({subReddit:(0,o.default)(),...r})}},741:(r,e,t)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0});const o=t(374);e.default=async function({subReddit:r,sortType:e="top",maxTries:t=15,postGetLimit:a=10}){var i,n,s;let l=null,c=0;for(;null!==typeof l&&c<=t;){const t=await(0,o.default)({subReddit:r,sortType:e,postGetLimit:a,excludeRaw:!1});if("string"==typeof(null===(i=t.raw)||void 0===i?void 0:i.url)&&(null===(n=t.raw)||void 0===n?void 0:n.url.length)>0&&!0===/\.(jpe?g|png|gif|bmp)$/i.test(null===(s=t.raw)||void 0===s?void 0:s.url)){l=t;break}c++}return null===l?"https://via.placeholder.com/150":!0===(null==l?void 0:l.raw.is_gallery)?function(r){var e,t;const o=Object.values(null===(e=r.raw)||void 0===e?void 0:e.media_metadata).filter((r=>"valid"===r.status));return null===(t=o[Math.floor(Math.random()*o.length)])||void 0===t?void 0:t.s.u.replace(/&amp;/g,"&")}(l):null==l?void 0:l.raw.url.replace("gifv","gif")}},105:(r,e,t)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0});const o=t(657);e.default=function(){return o.imageSubReddits[Math.floor(Math.random()*o.imageSubReddits.length)]}},803:(r,e,t)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0});const o=t(374),a=t(555);e.default=async function(r){return"string"==typeof(null==r?void 0:r.subReddit)&&(r.subReddit=void 0),await(0,o.default)({subReddit:(0,a.default)(),...r})}},374:(r,e,t)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0});const o=t(300),a=t(657);e.default=async function({subReddit:r,sortType:e="top",postGetLimit:t=10,excludeRaw:i=!0}){var n,s;if(null===r)return{error:"No sub reddit"};if("random"===e&&(e=a.sortTypes[Math.floor(Math.random()*a.sortTypes.length)]),!1===a.sortTypes.includes(e))return{error:`Invalid sort type: ${e}`};const l=await(0,o.default)(`https://www.reddit.com/r/${r}/${e}.json?limit=${t}`),c=await l.json();if(void 0!==c.error)return{error:`reddit error: ${c.error}`};const d=null===(s=null===(n=null==c?void 0:c.data)||void 0===n?void 0:n.children)||void 0===s?void 0:s.map((r=>r.data)),u=d[Math.floor(Math.random()*d.length)];return null===u?{error:"No post found"}:{image:"string"==typeof(null==u?void 0:u.url_overridden_by_dest)?u.url_overridden_by_dest:null,title:u.title,content:u.selftext,url:`https://www.reddit.com${u.permalink}`,subreddit:u.subreddit,author:u.author,upvotes:u.ups,downvotes:u.downs,upvoteRatio:u.upvote_ratio,nsfw:u.over_18,createdUTC:u.created_utc,category:u.category,thumbnail:u.thumbnail,pinned:u.pinned,archived:u.archived,awards:u.all_awardings,commentAmount:u.num_comments,html:u.selftext_html,raw:!0!==i?u:null}}},555:(r,e,t)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0});const o=t(657);e.default=function(){return o.subReddits[Math.floor(Math.random()*o.subReddits.length)]}},794:(r,e,t)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0});const o=t(555),a=t(378);e.default=async function(r){return"string"==typeof(null==r?void 0:r.subReddit)&&(r.subReddit=void 0),await(0,a.default)({subReddit:(0,o.default)(),...r})}},378:(r,e,t)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0});const o=t(300);e.default=async function({subReddit:r,excludeRaw:e=!0}){if(null===r)return{error:"no subreddit"};const t=await(0,o.default)(`https://www.reddit.com/r/${r}/about.json`),a=await t.json();if(void 0!==a.error)return{error:`reddit error: ${a.error}`};const i=a.data;return null===i?{error:"no subreddit found"}:{subreddit:i.display_name,title:i.title,description:i.public_description,url:`https://www.reddit.com${i.url}`,primaryColor:i.primary_color,keyColor:i.key_color,type:i.subreddit_type,icon:i.community_icon,userCount:i.subscribers,activeUserCount:i.active_user_count,banner:i.banner_background_image,mobileBanner:i.mobile_banner_image,bannerColor:i.banner_background_color,emojisEnabled:i.emojis_enabled,nsfw:i.over_18,createdUTC:i.created_utc,crossPostable:i.is_crosspostable_subreddit,raw:!0!==e?i:null}}},558:function(r,e,t){"use strict";var o=this&&this.__createBinding||(Object.create?function(r,e,t,o){void 0===o&&(o=t);var a=Object.getOwnPropertyDescriptor(e,t);a&&!("get"in a?!e.__esModule:a.writable||a.configurable)||(a={enumerable:!0,get:function(){return e[t]}}),Object.defineProperty(r,o,a)}:function(r,e,t,o){void 0===o&&(o=t),r[o]=e[t]}),a=this&&this.__exportStar||function(r,e){for(var t in r)"default"===t||Object.prototype.hasOwnProperty.call(e,t)||o(e,r,t)};Object.defineProperty(e,"__esModule",{value:!0}),e.randomSubInfo=e.subInfo=e.randomImageFromSub=e.randomImage=e.randomImageSub=e.randomSub=e.randomPost=e.randomPostFromSub=void 0;const i=t(374);e.randomPostFromSub=i.default;const n=t(803);e.randomPost=n.default;const s=t(555);e.randomSub=s.default;const l=t(105);e.randomImageSub=l.default;const c=t(750);e.randomImage=c.default;const d=t(741);e.randomImageFromSub=d.default;const u=t(378);e.subInfo=u.default;const p=t(794);e.randomSubInfo=p.default,a(t(344),e),a(t(405),e),e.default=n.default},657:(r,e)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.imageSubReddits=e.subReddits=e.sortTypes=void 0,e.sortTypes=["new","top","hot","controversial","rising"],e.subReddits="r/100yearsago r/1200isplenty r/13or30 r/1500isplenty r/2007scape r/2healthbars r/2meirl42meirl4meirl r/2meirl4meirl r/30ROCK r/3amjokes r/3Dprinting r/3DS r/3dshacks r/40kLore r/49ers r/4chan r/4PanelCringe r/5050 r/90DayFiance r/AbandonedPorn r/ableton r/ABoringDystopia r/ABraThatFits r/absolutelynotme_irl r/absolutelynotmeirl r/AbsoluteUnits r/AccidentalComedy r/AccidentalRacism r/AccidentalRenaissance r/accidentalswastika r/AccidentalWesAnderson r/Accounting r/ActLikeYouBelong r/actuallesbians r/Addons4Kodi r/ADHD r/AdPorn r/AdrenalinePorn r/AdvancedFitness r/adventuretime r/advertising r/Advice r/AdviceAnimals r/afkarena r/AfterEffectsr/AgainstHateSubreddits r/agedlikemilk r/ainbow r/AionNetwork r/AirForce r/airsoft r/AlbumArtPorn r/alcohol r/alexandradaddario r/AlexisRen r/algorithms r/algotrading r/AlienBlue r/aliens r/AliensAmongUs r/AlisonBrie r/Allsvenskan r/altcoin r/alternativeart r/AMA r/AMADisasters r/AmateurRoomPorn r/amazon r/amazonecho r/Amd r/americandad r/AmericanHorrorStory r/amibeingdetained r/amiibo r/Amish r/AmItheAsshole r/amiugly r/Amoledbackgrounds r/analog r/Anarchism r/Anarcho_Capitalism r/Android r/androidapps r/androiddev r/AndroidGaming r/AndroidQuestions r/androidthemes r/AndroidWear r/angularjs r/AnimalCrossing r/AnimalPorn r/AnimalsBeingBros r/AnimalsBeingDerps r/AnimalsBeingJerks r/AnimalsBeingMoms r/animalsdoingstuff r/Animalsthatlovemagic r/AnimalTextGifs r/animation r/anime r/anime_irl r/animegifs r/Animemes r/animenocontext r/Animesuggest r/Animewallpaper r/announcements r/ANormalDayInRussia r/answers r/AnthemTheGame r/Anthropology r/Anticonsumption r/AntiJokes r/antiMLM r/Anxiety r/aoe2 r/apexlegends r/apolloapp r/AppalachianTrailr/AppHookup r/apple r/AppleWatch r/ApplyingToCollege r/Aquariums r/ar15 r/arabfunny r/araragi r/Archaeology r/ArcherFX r/Archery r/architecture r/ArchitecturePorn r/archlinux r/arduino r/argentina r/ArianaGrande r/ARK r/arma r/army r/arresteddevelopment r/arrow r/Art r/ArtefactPorn r/ArtFundamentals r/artificial r/ArtisanVideos r/ArtPorn r/AryaWinsTheThrone r/AsianBeauty r/asiangirlsbeingcute r/asianpeoplegifs r/AskAcademia r/AskAnAmerican r/AskAnthropology r/AskCulinary r/AskDocs r/AskElectronics r/AskEngineers r/askgaybros r/AskHistorians r/AskMen r/AskMenOver30 r/AskNetsec r/AskOuija r/askphilosophy r/AskReddit r/asksciencer /AskScienceFiction r/AskSocialScience r/asktransgender r/asktrp r/AskTrumpSupporters r/AskUK r/AskWomen r/askwomenadvice r/asmr r/asoiaf r/aSongOfMemesAndRage r/aspergers r/assassinscreed r/assholedesign r/assholetax r/Assistance r/AstralProjection r/astrology r/Astronomy r/astrophotography r/ATBGE r/AteTheOnion r/atheism r/Atlanta r/attackontitan r/Audi r/audiobooks r/audioengineering r/audiophile r/Austin r/australia r/Austria r/AutoDetailing r/Autos r/Avengers r/aves r/aviation r/awakened r/AwardSpeechEdits r/awesome r/AwesomeCarMods r/awfuleverything r/awfuleyebrows r/aws r/aww r/Awwducational r/awwnime r/Awww r/awwwtf r/AyyMD r/babybigcatgifs r/BabyBumps r/BabyCorgis r/babyelephantgifs r/backpacking r/baconit r/baconreader r/Bad_Cop_No_Donut r/Badfaketexts r/badhistory r/badtattoos r/badwomensanatomy r/Baking r/Bandnames r/bangtan r/bannedfromclubpenguin r/barkour r/barstoolsports r/bartenders r/baseball r/BasicIncome r/Bass r/batman r/Battlecars r/Battlefield r/battlefield_4 r/battlefield_one r/BattlefieldV r/battlestations r/bayarea r/BBQ r/BDSMAdvice r/BeAmazed r/beards r/bearsdoinghumanthings r/beatles r/beauty r/BeautyBoxes r/BeautyGuruChatter r/Beekeeping r/beer r/beermoney r/beerporn r/beetlejuicing r/BeforeNAfterAdoption r/behindthegifs r/beholdthemasterrace r/belgium r/Berserk r/bertstrips r/bestof r/bestoflegaladvice r/bestofnetflix r/BestOfOutrageCulture r/BestOfReports r/beta r/bettafish r/betterCallSaul r/BetterEveryLoop r/beyondthebump r/bicycling r/bidenbro r/bigboobproblems r/bigboye r/BigBrother r/BigCatGifs r/bigdickproblems r/bikecommuting r/BikiniBottomTwitter r/binance r/bindingofisaac r/bingbongtheorem r/biology r/Bioshock r/bipolar r/Birbs r/BirdsArentReal r/BirdsBeingDicks r/birdswitharms r/bisexual r/bitchimabus r/Bitcoin r/BitcoinBeginners r/BitcoinMarkets r/bizarrebuildings r/bjj r/blackcats r/blackdesertonline r/blackhat r/blackmagicfuckery r/blackmirror r/blackops3 r/Blackops4 r/blackpeoplegifs r/BlackPeopleTwitter r/Blacksmith r/bleach r/blender r/Blep r/blessedimages r/BlockChain r/blog r/bloodborne r/blop r/BlueMidterm2018 r/blunderyears r/blursedimages r/BMW r/boardgamesr/BobsBurgers r/bodybuilding r/bodyweightfitness r/bois r/BoJackHorseman r/BokuNoHeroAcademia r/BollywoodRealism r/BoneAppleTea r/bonehurtingjuice r/Bonsai r/bookclub r/bookporn r/books r/booksuggestions r/boop r/boottoobig r/Borderlands r/Borderlands2 r/borderlands3 r/Bossfight r/boston r/bostonceltics r/Botchedsurgeries r/bouldering r/bourbon r/Boxing r/BoxingStreams r/boxoffice r/BPD r/BrandNewSentence r/brasil r/Brawlstars r/Breadit r/BreadStapledToTrees r/BreadTube r/breakingbad r/BreakUps r/Breath_of_the_Wild r/breathinginformation r/brisbane r/britishproblems r/BritishSuccess r/brockhampton r/Brogress r/brokengifs r/brooklynninenine r/Browns r/brushybrushy r/brutalism r/btc r/Buddhism r/BudgetAudiophile r/budgetfood r/buildapc r/buildapcforme r/buildapcsales r/buildapcsalesuk r/bulletjournal r/Bundesliga r/Bushcraft r/business r/BuyItForLife r/C25K r/CabinPorn r/cableporn r/Calgary r/California r/Calligraphy r/CallOfDuty r/calvinandhobbes r/camping r/CampingandHiking r/CampingGear r/canada r/CanadaPolitics r/cannabis r/CannabisExtracts r/cardano r/cardistry r/cardsagainsthumanity r/careerguidance r/carporn r/cars r/Cartalk r/castiron r/castles r/CasualConversation r/casualiama r/CasualUK r/CatastrophicFailure r/catbellies r/Catculations r/CatGifs r/Catholicism r/Catloaf r/catpictures r/catpranks r/cats r/CatsAreAssholes r/catsareliquid r/CatsISUOTTATFO r/CatSlaps r/catsonglass r/CatsStandingUp r/Catswhoyell r/Catswithjobs r/CatTaps r/CBD r/CBDOilReviews r/ccna r/CCW r/Celebhub r/Celebs r/cemu r/CFB r/CFBStreams r/CGPGrey r/chairsunderwater r/changemyview r/chaoticgood r/ChapoTrapHouse r/characterdrawing r/Cheap_Meals r/CheeseandRiceReddit r/chelseafc r/chemicalreactiongifs r/chemistry r/chess r/CHIBears r/chicago r/chicagobulls r/childfree r/ChildrenFallingOver r/chile r/China r/Chonkers r/ChoosingBeggars r/Christianity r/chrome r/Chromecast r/chromeos r/churning r/cigars r/Cinemagraphs r/cinematography r/circlejerk r/CircleofTrust r/CitiesSkylines r/CityPorn r/civ r/ClashOfClans r/ClashRoyale r/classic4chan r/classicalmusic r/classiccars r/classicwow r/ClassyPornstars r/cleanjokes r/clevelandcavs r/clevercomebacks r/climbing r/Coachella r/coaxedintoasnafu r/cocktails r/CoDCompetitive r/coding r/CODZombies r/Coffee r/cogsci r/collapse r/college r/CollegeBasketball r/Colorado r/coloringcorruptions r/Colorization r/ColorizedHistory r/CombatFootage r/combinedgifsr/comedy r/ComedyCemetery r/comedyheaven r/comedyhomicide r/comedynecromancy r/ComedyNecrophilia r/comicbookmovies r/comicbooks r/comics r/CommercialCuts r/communism r/communism101 r/community r/CompanyBattles r/CompetitiveHS r/Competitiveoverwatch r/COMPLETEANARCHY r/compsci r/computers r/computerscience r/confession r/confessions r/confidence r/confusing_perspective r/CongratsLikeImFive r/Conservative r/conspiracy r/conspiracytheories r/conspiratard r/consulting r/ContagiousLaughter r/continuityporn r/controllablewebcams r/ConvenientCop r/Cooking r/cookingforbeginners r/coolguides r/copypasta r/cordcutters r/corgi r/CorporateFacepalm r/cosplay r/cosplaybabes r/cosplaygirls r/coupons r/cowboys r/CowChop r/CozyPlaces r/cpp r/CrackWatch r/crafts r/CrappyDesign r/crappyoffbrands r/CrazyIdeas r/creepy r/creepyasterisks r/creepyencounters r/creepypasta r/creepyPMs r/CreepyWikipedia r/CrewsCrew r/Cricket r/cringe r/cringepics r/Cringetopia r/criticalrole r/crochet r/crossdressing r/crossfit r/CrossStitch r/CruciblePlaybook r/CrusaderKings r/crypto r/Crypto_Currency_News r/CryptoCurrencies r/CryptoCurrency r/CryptoCurrencyTrading r/CryptoMarkets r/cscareerquestions r/csgo r/csharp r/css r/Cubers r/curledfeetsies r/curlyhair r/Cursed_Images r/cursedcomments r/cursedimages r/cursedvideos r/customhearthstone r/CyanideandHappiness r/Cyberpunk r/cyberpunkgame r/cybersecurity r/cycling r/Cynicalbrit".split(" ").map((r=>r.replace("r/",""))),e.imageSubReddits="r/fashionphotography r/filmphotography r/lomography r/photoassignments r/Photoessay r/photographers r/photojournalism r/portraitphotos r/ProPhotoTips r/whatcamerashouldibuy r/photographic r/shutterbugs r/cameras r/postprocessing r/raweddits r/photos r/pics r/catpictures r/beerporn r/EarthPorn r/portraits r/video r/redditor_pics r/pics2 r/1000words r/ratemypic r/Unbelievable r/GreatPics r/foodshots r/LondonPics r/Decade r/RedditorsInAction r/urbanexploration r/picss r/ChicagoPics r/imgur r/Pentax r/weedpics r/CoolPics r/AnythingYouCanTakeAPhotographOfPorn r/analog r/hdr r/ToyCamera".split(" ").map((r=>r.replace("r/","")))},344:(r,e)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0})},405:(r,e)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0})},300:(r,e,t)=>{"use strict";var o=function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if(void 0!==t.g)return t.g;throw new Error("unable to locate global object")}();r.exports=e=o.fetch,o.fetch&&(e.default=o.fetch.bind(o)),e.Headers=o.Headers,e.Request=o.Request,e.Response=o.Response}},e={};function t(o){var a=e[o];if(void 0!==a)return a.exports;var i=e[o]={id:o,loaded:!1,exports:{}};return r[o].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}t.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(r){if("object"==typeof window)return window}}(),t.nmd=r=>(r.paths=[],r.children||(r.children=[]),r),(()=>{const r=t(558);var e=document.getElementById("canvas");const o=e.getContext("2d");var a=t(332).CanvasTextWrapper;const i=document.getElementById("git"),n=document.getElementById("subreddit"),s=document.getElementById("img-padding");s.value="30";const l=document.getElementById("text"),c=document.getElementById("yenile"),d=document.getElementById("text-size");d.value="30";const u=document.getElementById("text-font");u.value="OpenSans";const p=document.getElementById("text-color");p.value="#FFFFFF";const m=document.getElementById("gradient-color");m.value="#0000FF";const g=document.getElementById("gradient-check");g.ariaChecked=!0;const b=document.getElementById("gradient-start");b.value="50";const h=document.getElementById("resim-dosyasi");var f="";async function y(e){let t=await r.randomPostFromSub({subReddit:e,sortType:"new",postGetLimit:1e5});return console.log(t.image),t.image&&t.image.match(/redd.it(?=.*jpg|.*png)/)?t:await y(e)}function v(r,t,i,n,s,l,c,d){var u=new Image;u.onload=function(){if(o.canvas.height=u.height+n,o.canvas.width=u.width,o.drawImage(u,0,0),!0===c){console.log(parseInt(o.canvas.height*(1-d)),d);const r=o.createLinearGradient(0,parseInt(o.canvas.height*(1-d)),0,o.canvas.height);r.addColorStop(0,"transparent"),r.addColorStop(1,l),o.fillStyle=r,o.fillRect(0,0,e.width,e.height)}else o.fillStyle=l,o.fillRect(0,u.height,e.width,e.height);o.fillStyle=s,a(o.canvas,t,i)},u.src=r}i.addEventListener("click",(()=>{y(n.value).then((async r=>{f=r.image,l.value=r.title,h.url=r.image,console.log(d.value+" px "+u.value),v(r.image,r.title,{font:d.value+"px "+u.value,verticalAlign:"bottom",paddingX:20,paddingY:20},parseInt(s.value),p.value,m.value,g.checked,parseInt(b.value)/100)}))})),c.addEventListener("click",(()=>{if(0!==h.files.length&&h.files&&h.files[0]){var r=new FileReader;r.onload=function(r){f=r.target.result},r.readAsDataURL(h.files[0])}v(f,l.value,{font:d.value+"px "+u.value,verticalAlign:"bottom",paddingX:20,paddingY:20},parseInt(s.value),p.value,m.value,g.checked,parseInt(b.value)/100)}))})()})();