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