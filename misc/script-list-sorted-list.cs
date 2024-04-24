// Link/URL checks //
HybridGasLinkVerification(decodedUrl, webViewHTML);
AllAccessoryPageLinks(webViewHTML, decodedUrl);
URLTargetValue(webViewHTML, decodedUrl);
WacTrackingParameters(webViewHTML, decodedUrl);
AllLinksAreMasked(message_id, subjectLine, product);

LogoExistsWithRightLink(webViewHTML, "https://www.toyota.com/");
LogoExistsWithRightLink(webViewHTML, "https://drivers.lexus.com/lexusdrivers/service");

if (unit_test == "All survey links lead to the same target")
{
    var taskSurvey = AllSurveyLinksTarget(webViewHTML);
    taskSurvey.Wait();
    (bool value, string item, string itemValue) survey = taskSurvey.Result;
    return survey;
}



// Img checks //
GetHeaderLogo(webViewHTML);
AudioMultiMediaHero(webViewHTML, decodedUrl);
RightHeroBgIsPopulated(webViewHTML, decodedUrl);
TrackingPixels(webViewHTML, decodedUrl);

if (unit_test == "Hero images are scrolling")
{
    var taskHeros = HeroImgesAreScrolling(webViewHTML);
    taskHeros.Wait();
    (bool value, string item, string itemValue) heros = taskHeros.Result;
    return heros;
}


if (unit_test == "Hero background is a gif")
{
    var result = HeroBackgroundIsGif(webViewHTML);
    result.Wait();
    (bool value, string item, string itemValue) res = result.Result;
    return res;
}


// Copy checks //
IsLeaseDateValid(message_id, webViewHTML);
IsLeaseDateMonthsOut(message_id, 11, webViewHTML);
IsLeaseDateMonthsOut(message_id, 8, webViewHTML);
IsLeaseDateWeeeksOut(message_id, 14, webViewHTML);
VerbageCheckNoOffern35(webViewHTML);
ZipcodeCheckNOffer35(webViewHTML);
HasMpg(webViewHTML, decodedUrl);
IsKeylinePresent(webViewHTML, decodedUrl);
IsVinDisplayed(webViewHTML);
ReasonsToBelieveSafety(webViewHTML, decodedUrl);
UniversalImageDisclaimer(webViewHTML, decodedUrl, rootUrl);
OfferDisclaimerExists(webViewHTML, campaign, subject);
OWV1NameInHeroModule(webViewHTML, decodedUrl);
NewOwnerNewsLetterTitle(webViewHTML, decodedUrl);
PreheaderText(webViewHTML);
SameHeadlineForAllVehicles(webViewHTML);
VehiclesHaveMpgFlag(webViewHTML);
OfferOrNoOfferVerbaigeExists(webViewHTML, decodedUrl);
CorrectSubjectLine(decodedUrl, subjectLine, webViewHTML);
PreheaderAndDealerNamePresent(webViewHTML);
TitleElementText(webViewHTML, decodedUrl);
TelephoneNumberFormat(webViewHTML, decodedUrl);

// HTML element/DOM check (doesn't fall into any of the above; module checks, etc.) //
IsOutfittersModulePresent(webViewHTML);
IsDealerModulePresent(webViewHTML);
IsTimsModulePresent(webViewHTML);
ModuleCount(webViewHTML, decodedUrl, category);
CampaignHasBlackBg(webViewHTML);
CampaignHasWhiteBg(webViewHTML);
DisclaimersArePopulatedInOrder(webViewHTML);
SuperscriptsAreCorrectlyPopulated(webViewHTML);
ContentBackground(webViewHTML, decodedUrl);
HeroVehicleFeaturesAreShown(webViewHTML, decodedUrl);
WelcomeModuleIsInRightPosition(webViewHTML, decodedUrl);
BuildandPriceModuleExists(webViewHTML);
NewsletterAccessoriesModuleExists(webViewHTML, decodedUrl);
FamilyModuleOrder(webViewHTML, decodedUrl);
SubNavModuleIsPresent(webViewHTML, decodedUrl);
NewsletterPreferencesModuleIsPresent(webViewHTML, decodedUrl);
FamilyModuleIsPresent(webViewHTML);
OlympicsLogoIsPresent(webViewHTML);
TertiaryModuleIsPresent(webViewHTML);
BackgroundImageAndApiHero(webViewHTML);
ElectrifiedModule(webViewHTML);
ExpressMaintenanceOrExpertsAtYourServiceModule(webViewHTML, decodedUrl);
ZipCodeIsInHdbrTable(message_id, webViewHTML);
ImageEnvironment(webViewHTML);
SpellChecker(webViewHTML,rootUrl, azureFunctionRootDirectory);
EitherModuleExists(webViewHTML, "National Promotions module check", "Spring Event module", "Service by Lexus module", "Summer Event module", "Spring 2022 module", "Fall 2021 module", new List<string> { "Lexus Spring", "Service Event", "$100 OFF a set of 4 new tires", "Up to $50 OFF a set of brake pads" }, new List<string> { "service by lexus", "experience world-class craftsmanship", "and world-renowned care" }, new List<string> { "Lexus Summer", "Service Event", "$50 OFF a Lexus battery", "COMPLIMENTARY multi-point inspection" }, new List<string> { "$100 OFF A SET OF 4 NEW TIRES", "When you purchase an eligible set of 4 new tires or $50 off two eligible tires between 3/23 and 04/30/2022.", "SHOP TIRES" }, new List<string> { "$100 OFF A SET OF 4 NEW TIRES", "When you purchase an eligible set of 4 new tires or $50 off 2 eligible tires between 9/22 and 10/31.", "SHOP TIRES" });
RightEngageHeroExists(webViewHTML, decodedUrl, campaign);
AppFooter(webViewHTML, decodedUrl);
IsContentAvailableGeneric(webViewHTML, "Welcome Service Center", "", "", "Find your servicing dealer");
IsContentAvailableGeneric(webViewHTML, "Service Center", "", "", "Set up your service appointment with your local dealership.");
IsContentAvailableGeneric(webViewHTML, "toyotcare disclaimer", "", "", "ToyotaCare covers normal factory scheduled maintenance for two years or 25,000 miles, whichever comes first. Certain models require a different maintenance schedule as described in their Maintenance Guide. 24-hour Roadside Assistance is also included for two years, unlimited mileage. Roadside Assistance does not include parts and fluids, except emergency fuel delivery. See Toyota dealer for details and exclusions. Valid only in the continental U.S.");
IsContentAvailableGeneric(webViewHTML, "Flexfuel disclaimer", "", "", "Excludes those items listed in the Maintenance Guide under Special Operating Conditions. If the engine in this vehicle runs on E85 fuel more than 50 percent of the time, oil and filter changes are recommended every 2,500 miles. This is considered a Special Operating Condition. The additional oil changes are not covered under the no cost maintenance plan.");
IsContentAvailableGeneric(webViewHTML, "Mirai specific road side assitance copy", "welcome-banner-bodycopy-wrapper", "td", "emergency fuel delivery", "not contain", "module content");
IsContentAvailableGeneric(webViewHTML, "Mirai disclaimer", "", "", "ToyotaCare for Mirai covers normal factory scheduled maintenance for three years or 35,000 miles, whichever comes first. Certain models require a different maintenance schedule as described in their Maintenance Guide. 24-hour Roadside Assistance is also included for three years, unlimited mileage. Roadside Assistance does not include parts and fluids. Valid only through Authorized Mirai Fuel Cell Dealers. See an Authorized Mirai Fuel Cell Dealer for details and exclusions. Valid only in the continental U.S.");
IsContentAvailableGeneric(webViewHTML, "Mirai specific services", "desktop-service-center-wrapper", "td", "", "contains", "module content", new List<string>() { "Rotate Tires", "Replace Cabin Air Filter", "Multi-Point Inspection", "Replace Fuel Cell Air Filter", "Inspect & Adjust Fluids", "Replace Ion Exchanger Element", "Inspect Fuel Cell System Components", "Toyota Genuine Parts" }, "", "p");
IsContentAvailableGeneric(webViewHTML, "Prius or prius prime specific road side assistance copy", "welcome-banner-bodycopy-wrapper", "td", "3 years", "contains", "module content");
IsContentAvailableGeneric(webViewHTML, "Prius or prius prime", "", "", "ToyotaCare for Prius and Prius Prime covers normal factory scheduled maintenance for two years or 25,000 miles, whichever comes first. Certain models require a different maintenance schedule as described in their Maintenance Guide. 24-hour Roadside Assistance is also included for three years, unlimited mileage. Roadside Assistance does not include parts and fluids, except emergency fuel delivery. See Toyota dealer for details and exclusions. Valid only in the continental U.S.");
IsContentAvailableGeneric(webViewHTML, "Supra specific road side assistance copy", "welcome-banner-bodycopy-wrapper", "td", "tire service", "not contain", "module content");
IsContentAvailableGeneric(webViewHTML, "(This unit test is always marked failed, since the expMaint flags are currently not set up correctly across all campaigns. It instead displays if the express maintenance, Experts at your service or none of these modules are being displayed) Express maintenance module", "", "", "We won't slow you down");
IsContentAvailableGeneric(webViewHTML, "Coupon from AMP", "", "", "", "contains", "", new List<string> { "Toyota‑certified technicians", "are ready to provide exceptional service for" }, "", "", "");
IsContentAvailableGeneric(webViewHTML, "(This unit test is always marked failed, since the expMaint flags are currently not set up correctly across all campaigns. It instead displays if the express maintenance, Experts at your service or none of these modules are being displayed) Experts at your service - Express Maintenance module", "", "", "Service done right, right now");
IsContentAvailableGeneric(webViewHTML, "Toyota 86", "hero", "td", "Toyota 86");
IsContentAvailableGeneric(webViewHTML, "Toyota C-HR", "hero", "td", "Toyota C-HR");
IsContentAvailableGeneric(webViewHTML, "Experts at your service module", "", "", "Our Toyota-certified technicians use Toyota Genuine Parts and Accessories that are precision-engineered for your vehicle.");
IsContentAvailableGeneric(webViewHTML, "OCPe Service Reminder Hero Minor", "hero", "td", "", "contains", "module content", new List<string>() { "Our experts are ready to help" }, "", "h2");
IsContentAvailableGeneric(webViewHTML, "OCPe Service Reminder Hero Major", "hero", "td", "", "contains", "module content", new List<string>() { "Let us take care of your Toyota Scion" }, "", "h2");
IsContentAvailableGeneric(webViewHTML, "A CTA in the hero module", "", "", "Schedule your service", "contains", "module content");
IsContentAvailableGeneric(webViewHTML, "Schedule service CTA", "hero", "td", "Schedule service", "contains", "module content");
IsContentAvailableGeneric(webViewHTML, "Service thank you declined service CTA in hero", "hero-sortable", "td", "Schedule service", "contains", "module content");
IsContentAvailableGeneric(webViewHTML, "TY with first paid visit no CTA", "hero-sortable", "td", "Book a visit", "not contain", "module content");
IsContentAvailableGeneric(webViewHTML, "Coupon from AMP", "", "", "", "contains", "", new List<string> { ".00 OFF", "expires" }, "", "", "");
IsContentAvailableGeneric(webViewHTML, "Dealer module exists", "", "", "", "contains", "", new List<string>() { "Get directions", "Service Department Hours", "View dealer website", "Some of our amenities:" }, "", "", "");
IsContentAvailableGeneric(webViewHTML, "Headline: LET'S CONTINUE THE JOURNEY", "hero-headline-wrapper", "td", "LET'S CONTINUE THE JOURNEY", "contains", "module content", null, "", "", "");
IsContentAvailableGeneric(webViewHTML, "The right body copy", "bodycopy-wrapper", "td", $"Congratulations on your {v1ModelYear} {v1Series}. As someone who is familiar with Lexus vehicles, you'll appreciate that we are committed to providing an experience as well-crafted as the vehicle you've chosen to drive. Sit back, relax and enjoy.", "contains", "module content", null, "", "", "");
IsContentAvailableGeneric(webViewHTML, "Connect to more with Lexus Enform", "", "", "", "contains", "", new List<string> { "Connect to more with Lexus Enform", "Sign up, activate or manage your Lexus Enform services with the Lexus App." }, "", "", "");
IsContentAvailableGeneric(webViewHTML, "CTA : Register today module", "hero-sortable-wrap", "td", "Register today", "contains", "multiple modules", null, "", "", "");
IsContentAvailableGeneric(webViewHTML, "CTA : Learn more module", "hero-sortable-wrap", "td", "Learn more", "contains", "multiple modules", null, "", "", "");
IsContentAvailableGeneric(webViewHTML, "All your benefits in one place module", "", "", "", "contains", "", new List<string> { "All your benefits in one place", "Experience Lexus ownership to its fullest with the convenient features and exclusive benefits that are available through Lexus Drivers and the Lexus App.", "Click or tap any of these icons to explore what Lexus Drivers has to offer.", "Resources:", "Owner Exclusives:", "Vehicle Specifications:", "How-To Guides:" }, "", "", "");
IsContentAvailableGeneric(webViewHTML, "We're Here to Help module", "hero-sortable-wrap", "td", "We're Here to Help", "contains", "multiple modules", null, "", "", "");
IsContentAvailableGeneric(webViewHTML, "Lexus transactional footer", "footer_wrap", "td", "This Lexus communication is intended for residents of the United States only.", "contains", "multiple modules", null, "", "", "");
IsContentAvailableGeneric(webViewHTML, "The right body copy for Lexus new owner", "", "", "Welcome to Lexus, where you will enjoy world-class craftsmanship and vehicle care, as well as unparalleled personal attention. We are committed to ensuring your experience is nothing short of amazing.", "contains", "module content", null, "", "", "");
IsContentAvailableGeneric(webViewHTML, "Connect to more with Lexus Enform", "hero-sortable-wrap", "td", "Connect to more with Lexus Enform", "contains", "multiple modules", null, "", "", "");
IsContentAvailableGeneric(webViewHTML, "Welcome Hero : Content module", "hero-sortable-wrap", "td", "This is the start of something amazing", "contains", "multiple modules", null, "", "", "");
GenericContentExists(webViewHTML, "Service center module", "desktop-service-center-wrapper", "td", "");
GenericContentExists(webViewHTML, "Dealer name to the right of logo", "logo_wrap", "td", "p");
SortableModuleElements(webViewHTML, new List<string>() { "bodycopy" }, 1);
SortableModuleElementsWithValueMatch(obj);
SortableModuleElementsWithValueMatch(obj);
SortableModuleElementsWithValueMatch(obj);
SortableModuleElements(webViewHTML, new List<string>() { "bodycopy" }, 0);
SortableModuleElements(webViewHTML, new List<string> { "hero" }, 2);
SortableModuleElements(webViewHTML, new List<string> { "hero" }, 2);
SortableModuleElements(webViewHTML, new List<string>() { "hero", "cta", "bodycopy", "headline" }, 0);
SortableModuleExactMatch(webViewHTML, "Unparalleled service module", new List<string>() { "Unparalleleded service", "We also strive to make every visit a pleasure for Lexus owners, with additional services, amenities and special touches wherever possible", "Learn More" }, 1);

if (unit_test == "Has the correct amount of vehicles")
{
    var vehicles = HasCorrectAmountOfVehicles(webViewHTML, decodedUrl, campaign);
    vehicles.Wait();
    (bool value, string item, string itemValue) res = vehicles.Result;
    return res;
}


// Still Valid? (ask pod lead/member) //
InteriorTour(webViewHTML, decodedUrl); // img check
ShowUniqueVehicles(webViewHTML, 11);
DeterminerBeforeVehicleName(webViewHTML, decodedUrl);

if (unit_test == "Accessories count")
{
    var taskAccessory = AccessoriesCount(webViewHTML, 2);
    taskAccessory.Wait();
    (bool value, string item, string itemValue) accessory = taskAccessory.Result;
    return accessory;
}

// If everything fails; stored in if conditional, wrapping all unit test list //
return (value: false, item: "", itemValue: "");