var log = (...o) => console.log.apply(console, o);

// --------------------------------------------------
function getX()
{
	return 1 + 2;
}

log("getX:", getX()); // 3
log("getX:", getX()); // 3

// --------------------------------------------------
var data = 'cow';
function getX()
{
	return 1 + 2 + data;
}

log("getX:", getX()); // '3cow'
data = 1;
log("getX:", getX()); // 4

// --------------------------------------------------
var data = 'cow';
function getX(data)
{
	return 1 + 2 + data;
}

log("getX:", getX('cow')); // '3cow'
data = 1;
log("getX:", getX('cow')); // '3cow'

// --------------------------------------------------
log("window.cow:", window.cow);

log("window.cow first:", window.cow); // undefined

window.cow = 'moo';

log("window.cow after setting:", window.cow); // moo

window.cow = new Date();

log("window.cow after setting 2nd:", window.cow); // [object Date]

// --------------------------------------------------
// psuedo code from Angular 1
function MyController($scope)
{
	$scope.cow = 'moo';
}

expect(controller.cow).to.equal('moo') // true

function MyController()
{
	var vm = this;
	vm.cow = 'moo';
}

expect(controller.cow).to.equal('moo') // true

// --------------------------------------------------
// psuedo code from Angular 1 / ES5, userModel.factory.js
angular.module('com.jessewarden.main')
.factory('userModel', userModel);

function userModel()
{
	return {
		firstName: 'Jesse',
		lastName: 'Warden'
	};
}

// ES6
export default function userModel()
{
	return {
		firstName: 'Jesse',
		lastName: 'Warden'
	};
}

// --------------------------------------------------
// setting variables
var data = 'cow';

expect(data).toBe('cow');

data = 'moo';

expect(data).toBe('moo');

log('Tests passed.');

// --------------------------------------------------
// setting variables via functions
var data = 'cow';

function setData(value)
{
	data = value;
}

expect(data).toBe('cow');

setData('moo');

expect(data).toBe('moo');

log('Tests passed.');

// --------------------------------------------------
// Object.assign normal way through objects
var data = {
	value: 'cow'
};

expect(data.value).toBe('cow');

var newData = Object.assign({}, data, {value: 'moo'});

expect(newData.value).toBe('moo');

expect(data !== newData).toBe(true);

log("Tests passed.");

// --------------------------------------------------
// imperative code
function getNotes(accountNumber)
{
	return new Promise((success, failure)=>
	{
		if(predicates.validAccountNumber(accountNumber) === false)
		{
			return failure(new Error('accountNumber is invalid.'));
		}
		oracle.getConnection()
		.then(()=>
		{
			connection.execute(
			getNotesQueryString(accountNumber),
			[],
			function(err, result)
			{
				if(err)
				{
					console.error(err.message);
					oracle.release(connection);
					return failure(err);
				}
				oracle.release(connection);
				try
				{
					success(queryResultToNoteList(result));
				}
				catch(parseError)
				{
					failure(new Error("Failed to parse query results:" + parseError.toString()));
				}
			});
		})
		.catch(failure);
	});
}

// and integration test for it
it('gets a list of notes', (done)=>
{
	note.getNotes()
	.then((result)=>
	{
		expect(result).to.have.length.above(1);
		done();
	})
	.catch(done);
});

// How do you test oracle.getConnection? Sinon and/or insane mocks.
function getConnection()
{
	return new Promise(function(success, failure)
	{
		oracleAPI.getConnection(
		{
			user          : config.user,
			password      : config.password,
			connectString : config.connectString
		},
		function(err, connection)
		{
			if(err)
			{
				console.error(err.message);
				return failure(err);
			}
			success(connection);
		});
	});
}

// How do you test bad password? Let's refactor.
function getConnection(oracleAPI, config)
{
	return new Promise(function(success, failure)
	{
		oracleAPI.getConnection(
		{
			user          : config.user,
			password      : config.password,
			connectString : config.connectString
		},
		function(err, connection)
		{
			if(err)
			{
				console.error(err.message);
				return failure(err);
			}
			success(connection);
		});
	});
}

// and unit test
var mock = {
	getConnection: (config, callback)=>
	{
		callback(undefined, {});
	}
};
it('gives you a connection with valid creds', function()
{
	return oracle.getConnection(mock, oracle.defaultConfig());
});

// now, let's refactor getNotes
function getNotes(connection, accountNumber)
{
	return new Promise((success, failure)=>
	{
		if(predicates.validAccountNumber(accountNumber) === false)
		{
			return failure(new Error('accountNumber is invalid.'));
		}
		connection.execute(
		getNotesQueryString(accountNumber),
		[],
		function(err, result)
			{
			if (err)
			{
				console.error(err.message);
				return failure(err);
			}
			// console.log("note results:", result);
			try
			{
				success(queryResultToNoteList(result));
			}
			catch(parseError)
			{
				failure(new Error("Failed to parse query results:" + parseError.toString()));
			}
		  });
	});
}

// and the unit test
var mock = {
	execute: (queryStr, injections, callback)=>
	{
		callback(undefined, {});
	}
};
it('returns notes', function()
{
	return note.getNotes(mock, 1);
});

// --------------------------------------------------
// initial state
var defaultState = {
	loading: false,
	loginError: undefined,
	user: readUserFromLocalStorage(window.localStorage)
};

// --------------------------------------------------
// more realistic state tree
var defaultState = {
	login: {
		loading: false,
		error: undefined,
		user: readUserFromLocalStorage(window.localStorage)
	},
	search: {
		text: "",
		field: "name",
		loading: false,
		results: undefined,
		error: undefined
	},
	newUserRole: {
		loading: false,
		error: undefined,
		roles: []
	},
	account: {
		loading: false,
		error: undefined,
		details: undefined,
		notes: undefined,
		hoverNote: undefined
	},
	roles: {
		loading: false,
		error: undefined,
		loadingAllUsersAndRoles: false,
		loadingAllUsersAndRolesError: undefined,
		users: undefined,
		roles: undefined,
		history: []
	}
};

// --------------------------------------------------
// actions & action creators
{
	type: "SEARCH",
	text: "some search text"
}

// better
const SEARCH = "SERCH";

{
	type: SEARCH,
	text: "some search text"
}

// even better
const SEARCH = "SERCH";
const searchAction = {
	type: SEARCH,
	text: "some search text"
};

// mo bettah
const SEARCH = "SERCH";

function searchAction(text)
{
	
	return {
		type: SEARCH,
		text: text
	};
}

// even mo bettah
const SEARCH = "SERCH";

function searchAction(text)
{
	
	return {
		type: SEARCH,
		text
	};
}

// omg, this is why functional people have a bad rep
function searchAction(text)
{
	const SEARCH = "SERCH";	
	return {
		type,
		text
	};
}

// for edit's, don't do this...
{
	type: "EDIT_USER",
	user: userObject
}

// ... do this
{
	type: "EDIT_USER",
	userID: userObject.id
}

// --------------------------------------------------
// reducers

{
	type: "EDIT_USER",
	userID: userObject.id,
	firstName: 'Jesse'
}

// ...

var user = {
	firstName: 'Jessie',
	lastName: 'Warden'
};
expect(user.firstName).toBe('Jessie');
expect(user.lastName).toBe('Warden');

user = Object.assign({}, user, {firstName: 'Jesse'});

expect(user.firstName).toBe('Jesse');
expect(user.lastName).toBe('Warden');

log("Tests passed.");

// based on Array.reduce
// reduce crud I don't need, not in number

var searchResults = [
	{
		result: true,
		database: 'oracle',
		data: [...]
	},
	{
		result: true,
		database: 'mainframe',
		data: [...]
	}
];

// what I want
var searchResults = [...];

// how do I get there?
var searchResults = [
	{
		result: true,
		database: 'oracle',
		data: [1, 2, 3]
	},
	{
		result: true,
		database: 'mainframe',
		data: [4, 5, 6]
	},
	{
		result: false,
		database: 'mongo'
	}
];
var reducedResults = _.reduce(searchResults, (arr, item)=>
{
	if(item.result)
	{
		arr = arr.concat(item.data);
	}
	return arr;
}, []);
log("reducedResults:", reducedResults); // [1, 2, 3, 4, 5, 6]

// Redux Reducer
export const SEARCH = 'SEARCH';
export const SEARCH_RESULT = 'SEARCH_RESULT';
export const SEARCH_ERROR = 'SEARCH_ERROR';

const defaultState = {
	loading: false,
	text: "",
	results: undefined,
	error: undefined
};

export function search(state=defaultState, action)
{
	switch(action.type)
	{
		case SEARCH:
			return Object.assign({}, state, {
				loading: true,
				text: action.text,
				error: undefined
			});

		case SEARCH_ERROR:
			return Object.assign({}, state, {
				loading: false,
				error: action.searchError
			});

		case SEARCH_RESULT:
			return Object.assign({}, state, {
				loading: false,
				error: undefined,
				results: action.searchResults
			});
	}
}

// Reducer our reducers
export function search(state=defaultState, action)
{
	switch(action.type)
	{
		case SEARCH:
			return searchReducer(state, action);

		case SEARCH_ERROR:
			return searchError(state, action);

		case SEARCH_RESULT:
			return searchResult(state, action);
	}
}

function searchReducer(state, action)
{
	return Object.assign({}, state, {
		loading: true,
		text: action.text,
		error: undefined
	});
}

function searchError(state, action)
{
	return Object.assign({}, state, {
		loading: false,
		error: action.searchError
	});
}

function searchResult(state, action)
{
	return Object.assign({}, state, {
		loading: false,
		error: undefined,
		results: action.searchResults
	});
}

// --------------------------------------------------
// now create Store
import { createStore } from 'redux'
import searchReducer from './reducers'
const store = createStore(searchReducer);

// can I see what's inside?
store.subscribe(()=>
{
	var state = store.getState();
	log(state);
	// {
	// 	loading: false,
	// 	results: undefined,
	// 	error: undefined
	// }
});

// can I put what's inside?
const store = createStore(searchReducer, {
	loading: true,
	results: [1],
	text: "",
	error: undefined
});

// how do I change it?
store.dispatch(
	{
		type: SEARCH,
		text: 'some search text'
	}
);

// did it change?
expect(store.getState().text).toBe('some search text');

// how do I stop listening in Views?
const unsubscribe = store.subscribe(()=>
{

});

unsubscribe();

// --------------------------------------------------
// data flow

// #1
store.dispatch(
	{
		type: SEARCH,
		text: 'some search text'
	}
);

// #2
// store.getState()
const currentState = {
	loading: false,
	results: undefined,
	text: "",
	error: undefined
};

// action
const action = {
	type: SEARCH,
	text: 'some search text'
};

const nextState = searchReducer(state, action);
// {
// 	loading: true,
// 	results: undefined,
// 	text: 'some search text',
// 	error: undefined
// }

// #3
// multiple reducers are called if a bigger tree

// #4
// new state saved
const newState = store.getState();
expect(newState).toNotBe(currentState);

// --------------------------------------------------
// async via Thunks

// sync
function onSearch()
{
	store.dispatch({
		type: 'SEARCH',
		text: 'some search text'
	});
}

// async
function onSearch()
{
	const deferred = $q.defer();
	$state.go('search.loading')
	.then(()=>
	{
		store.dispatch({
			type: 'SEARCH',
			text: 'some search text'
		});
		return searchService.search('some search text');
	})
	.then((results)=>
	{
		deferred.resolve(store.dispatch({
			type: 'SEARCH_RESULT',
			results: results
		}));

	})
	.catch((error)=>
	{
		deferred.reject(store.dispatch({
			type: 'SEARCH_ERROR',
			error
		}));
	});
	return deferred.promise;
}

// async test
const mockSearchResults = [... mock ...];
beforeEach(()=>
{
	$httpBackend.whenGET(GET_URL)
	.respond({result: true, data: mockSearchResults});
});
it('should return search results', ()=>
{
	controller.onSearch('some search text').should.eventually
	.deep.equal({type: 'SEARCH_RESULT', results: mockSearchResults});
	$httpBackend.flush();
});

it('should blow up', ()=>
{
	controller.onSearch().should.eventually
	.deep.equal({type: 'SEARCH_ERROR'});
	$httpBackend.flush();
});

// async thunk






function SearchController($ngRedux)
{
	var vm = this;
	vm.onSearch = onSearch;

	function onSearch()
	{

	}
}