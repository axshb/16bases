Need to fix DB communication/API handling
- Dark mode should be a user option (currently, default dark for all)
- Loading themes from the DB is broken, likely because the code is taking the full request body rather than just the colors. Could possibly just be because the column in the database has been renamed as well 
- ~Fix BuiltIn flag, this can just be false whenever the post request is made~

