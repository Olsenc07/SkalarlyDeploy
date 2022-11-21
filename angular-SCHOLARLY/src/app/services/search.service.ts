import { Injectable, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

enum SearchValues {
  COLLEGE_CONNECTION = 'college_connection',
  BLUE_CLUBS = 'blue_clubs',
  COURSE_A_E = 'course_a_e',
  COURSE_F_M = 'course_f_m',
  COURSE_N_Z = 'course_n_z',
  ENTREP_IDEA = 'entrep',
  HELP_WANTED = 'help',
  HOUSING = 'housing',
  MISCELL_BUY_SELL = 'buy_sell',
  SCHOOL_WORK = 'school_work',
  SPIRITUALITY = 'spiritituality',
  U_OF_T_QS = 'questions',
  UPCOMING_EVENTS = 'upcoming_events',
}
interface SearchOption {
  value: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class SearchListService {
  public searchOptions: SearchOption[] = [
    { name: 'Blues Clubs', value: SearchValues.BLUE_CLUBS },
    { name: 'Buy & Sell', value: SearchValues.MISCELL_BUY_SELL },
    { name: 'College Connections', value: SearchValues.COLLEGE_CONNECTION },
    { name: 'Entrepreneurial Opportunities', value: SearchValues.ENTREP_IDEA },
    { name: 'Helping Hand', value: SearchValues.HELP_WANTED },
    { name: 'Housing', value: SearchValues.HOUSING },
    { name: 'Programs A-E', value: SearchValues.COURSE_A_E },
    { name: 'Programs F-M', value: SearchValues.COURSE_F_M },
    { name: 'Programs N-Z', value: SearchValues.COURSE_N_Z },
    { name: 'School Work', value: SearchValues.SCHOOL_WORK },
    { name: 'Spirituality', value: SearchValues.SPIRITUALITY },
    { name: 'Questions', value: SearchValues.U_OF_T_QS },
    { name: 'Upcoming Events', value: SearchValues.UPCOMING_EVENTS },
  ];

  constructor() {}

  getSearchOptions(): SearchOption[] {
    return this.searchOptions;
  }

  /* TODO: ideally all of these would be SearchOption's instead of strings

  so for example:
  specificOptions = [
    'Applied Science & Engineering'
  ]

  would become:
  specificOptions = [
     { name: 'Applied Science & Engineering', value: SearchValues.APPLIED_SCIENCE }
  ]

  That way we can easily access them by their value.

  This isn't something we need right away, it would just help cleanup some things
  */

  onSearchSelection(value: string): string[] {
    let specificOptions: string[];
    switch (value) {
      case SearchValues.COLLEGE_CONNECTION:
        specificOptions: [
          { name: 'Applied Science & Engineering', color: 'primary' },
          { name: 'Architecture, Landscape & Design', color: 'primary' },
          { name: 'Arts & Science', color: 'primary' },
          { name: 'Continuing Studies', color: 'primary' },
          { name: 'Dentistry', color: 'primary' },
          { name: 'Education', color: 'primary' },
          { name: 'Emmanuel College', color: 'primary' },
          { name: 'Information', color: 'primary' },
          { name: 'Kinesiology & Physical Education', color: 'primary' },
          { name: 'Knox College', color: 'primary' },
          { name: 'Law', color: 'primary' },
          { name: 'Management', color: 'primary' },
          { name: 'Medicine', color: 'primary' },
          { name: 'Music', color: 'primary' },
          { name: 'New College', color: 'primary' },
          { name: 'Nursing', color: 'primary' },
          { name: 'Pharmacy', color: 'primary' },
          { name: 'Public Health', color: 'primary' },
          { name: 'Regis College', color: 'primary' },
          { name: 'Social Work', color: 'primary' },
          { name: 'St. Micheals College', color: 'primary' },
          { name: 'Innis College', color: 'primary' },
          { name: 'Theology', color: 'primary' },
          { name: 'Trinity College', color: 'primary' },
          { name: 'University College', color: 'primary' },
          // How would these work..
          { name: 'U Of T Mississauga', color: 'primary' },
          { name: 'U Of T Scarborough', color: 'primary' },
          { name: 'Victoria College', color: 'primary' },
          { name: 'Woodsworth College', color: 'primary' },
          { name: 'Wycliffe College', color: 'primary' },
        ];
        break;
      case SearchValues.BLUE_CLUBS:
        specificOptions = [
          'Academic',
          'Arts',
          'Athletics & Recreation',
          'Community Service',
          'Culture & Identities',
          'Environment & Sustainability',
          'Hobby & Leisure',
          'Global Interests',
          'Leadership',
          'Media',
          'Other',
          'Politics',
          'Social Justice & Advocacy',
          'Social',
          'Spirituality & Faith Communities',
          'Student Governments, Unions & Councils',
          'Work & Career Development',
        ];
        break;
      case SearchValues.COURSE_A_E:
        specificOptions = [
          'Academic Bridging Program',
          'Acturial Science',
          'American Studies',
          'Anatomy',
          'Anthropology',
          'Archaeology',
          'Architecture & Visual Studies',
          'Art History',
          'Astronomy & Astrophysics',
          'Biochemistry',
          'Biology',
          'Theoretical Astrophysics',
          'Cell & Systems Biology',
          'Cinema Studies Institute',
          'Computer Science',
          'Contemporary Asian Studies',
          'Criminology & Sociolegal Studies',
          'Diaspora & Transnational Studies',
          'Drama',
          'Theatre & Performance Studies',
          'Earth Sciences',
          'East Asian Studies',
          'Ecology & Evolutionary Studies',
          'Economics',
          'Environmental School',
          'Estonian',
          'Ethics',
          'European Studies',
        ];
        break;
      case SearchValues.COURSE_F_M:
        specificOptions = [
          'Finnish',
          'First-Year Foundations',
          'Forest Conservation & Forest Biomaterials Science',
          'French',
          'Geography & Planning',
          'German',
          'History',
          'History & Philosophy of Science & Technology',
          'Human Biology',
          'Hungarian',
          'Immunology',
          'Impact Culture',
          'Indigenous Studies',
          'Industrial Relations & Resources (Centre For)',
          'Innis College',
          'Italian',
          'Centre For Jewish Studies',
          'Laboratory Medicine & Pathobiology',
          'Latin American Studies',
          'Life Sciences',
          'Linguistics',
          'Material Science',
          'Mathematics',
          'Molecular Genetics & Microbiology',
          'Munk One',
          'Music',
        ];
        break;
      case SearchValues.COURSE_N_Z:
        specificOptions = [
          'Near & Middle Eastern Civilizations',
          'New College',
          'Nutritional Sciences',
          'Peace, Conflict & Justice',
          'Pharmacology & Toxicology',
          'Philosophy',
          'Physiology',
          'Physics',
          'Planetary Science',
          'Political Science',
          'Portuguese',
          'Psychology',
          'Public Policy',
          'Religion',
          'Rotman Commerce',
          'St.Michaels College',
          'Sexual Diversity Studies',
          'Slavic Languages & Literature',
          'Sociology',
          'South Asian Studies',
          'Spanish',
          'Statistical Sciences',
          'Trinity College',
          'University College',
          'Victoria College',
          'Women & Gender Studies',
          'Woodsworth College',
          'Yiddish Studies',
        ];
        break;
      case SearchValues.ENTREP_IDEA:
        specificOptions = [
          'Arts',
          'Contracting',
          'Enviromental & Conservation',
          'Health Care',
          'Money Managing',
          'Non-Profit',
          'Science & Technology',
          'Sports',
          'Travel',
          'Unique Ideas',
        ];
        break;
      case SearchValues.HELP_WANTED:
        specificOptions = [
          'Cleaning',
          'Cooking & Groceries',
          'Designing',
          'Electronic Based',
          'Moving/Furniture',
          'Transportation',
          'Volunteering',
          'Walking Home',
        ];
        break;
      case SearchValues.HOUSING:
        specificOptions = [
          // 'Buy & Sell',
          'ISO Residence',
          'Questions & Advice',
          'Roommate Wanted',
          'Subleting',
        ];
        break;
      case SearchValues.MISCELL_BUY_SELL:
        specificOptions = ['Items for Sale'];
        break;
      case SearchValues.SCHOOL_WORK:
        specificOptions = [
          'Study Groups',
          'Textbooks Buy/Sell',
          'Tutors',
          'Buy/Sell School Supplies',
          'Instructor Review',
          'Question & Answer',
        ];
        break;
      case SearchValues.SPIRITUALITY:
        specificOptions = [
          'Church Times & Locations',
          'Faith Based Activities',
          'Fundraisers',
          'Prayer Groups',
          'Prayer Requests',
        ];
        break;
      case SearchValues.U_OF_T_QS:
        specificOptions = [
          'Class Registration Advice',
          'Student Discounts',
          'Open Questions',
        ];
        break;
      case SearchValues.UPCOMING_EVENTS:
        specificOptions = [
          'Arts & Science',
          'Club Sports',
          'Concerts',
          'Drop In Games',
          'Festivals',
          'Fraternities & Sororities',
          'Fundraisers',
          'Intramural Sports',
          'Miscellaneous',
          'Parties & Clubs',
          'Varsity Sports',
          'Video & Board Games',
        ];
        break;

      default:
        specificOptions = [];
    }
    return specificOptions;
  }
}
