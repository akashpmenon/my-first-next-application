// //write a function to process the back characters ‘<’ in a string. For example: “hell<<o” => “heo”; “<w<orld<<” => “or”; “abc<<<<<” => “”

const deleteBack = (str) => {
  let newStr = '';
  if (typeof str === 'string') {
    for(let i=0; i<str.length ; i++) {
      if (str.charAt(i) !== '<') {
        newStr = `${newStr}${str.charAt(i)}`;
      } else {
        if (newStr.length && str.charAt(i) === '<') {
          newStr = newStr.slice(0, newStr.length - 1);
        }
      }
    }
    return newStr;
  } else {
    return new Error('Enter a valid string');
  }
};

console.log(deleteBack('hell<<o'));
console.log(deleteBack('<w<orld<<'));
console.log(deleteBack('abc<<<<<'));

// Given:

const sarah = {name: 'sarah', savings: 500, checking: 300};
const toby = {name: 'toby', savings: 500, checking: 300};
const john = {name: 'john', savings: 900};
const bruce = {name: 'bruce', checking: 200};
const carol = {name: 'carol', savings: 500, checking: 600};
const jim = {name: 'jim', checking: 200};
const casey = {name: 'casey', savings: 500, checking: 200};
const nich = {name: 'nich'};
const mark = {name: 'mark', clients: [carol, toby, nich]};
const holly = {name: 'holly', clients: [john, jim, bruce, sarah]};
const cindy = {name: 'cindy', clients: [casey]};
const bob = {name: 'bob', clients: null};
const hsbc = {name: 'hsbc', advisors: null}
const chase = {name: 'chase', advisors: [mark, holly]};
const citiBank = {name: 'citiBank', advisors: [cindy, bob]};
const firms = [chase, citiBank, hsbc];

// Part A. write a function that takes a firms array and return full client data and sorted by biggest savings amount, checking amount, then by client name.
// clients = [
//  ...
//  {name: 'sarah': savings: 500, checking: 300, advisor: 'mark', firm: 'chase'},
//  {name: 'toby': savings: 500, checking: 300, advisor: 'holly', firm: 'chase'},
//  ...
// ]

const getClients = (firmList) => {
  const clients = [];

  firmList.forEach(firm => {
    if (Array.isArray(firm.advisors)) {
      firm.advisors.forEach(advisor => {
        if (Array.isArray(advisor.clients)) {
          advisor.clients.forEach(client => {
            const newClient = {
              ...client,
              firm: firm.name,
              advisor: advisor.name,
            };
            clients.push(newClient);
          });
        }
      });
    }
  });
  clients.sort((a, b) => (b.savings || 0) - (a.savings || 0));
  clients.sort((a, b) => (a.savings === b.savings) && (b.checking || 0) - (a.checking || 0));
  clients.sort((a, b) => ((a.savings === b.savings) && (a.checking === b.checking)) && (a.name < b.name ? -1 : 1));
  return clients;
}

const createFirms = (clients) => {
  let firms = [];
  clients.forEach((client) => {
    let newFirm = {};
    if (!firms.find(firm => firm.name === client.firm)) {
      newFirm.name = client.firm;
      newFirm.advisors = [ 
        {
          name: client.advisor,
          clients: [
            {
              ...client
            }
          ] 
        }
      ];
      firms.push(newFirm);
    } else {
      let existingFirm = firms.find(firm => firm.name === client.firm);
      if (!existingFirm.advisors.find(adv => adv.name === client.advisor)){
        existingFirm.advisors.push(
          {
            name: client.advisor,
            clients: [
              {
                ...client
              }
            ] 
          }
        )
      } else {
        existingFirm.advisors.find(adv => adv.name === client.advisor).clients.push({
          ...client
        })
      }
      // existingFirm.advisors.push(
      //   {
      //     name: client.advisors,
      //     clients: [
      //       {
      //         ...clients
      //       }
      //     ]
      //   }
      // );
    }
  });
  return firms;
}

console.dir(createFirms(getClients(firms)), { depth: null });
// Part B. From list of clients, construct a firms array object
// firms = [
//  ...
//  {name: 'chase': advisors: [...]},
//  {name: 'citiBank': advisors: [...]},
//  ...
// ]