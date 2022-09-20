class Bank
{  
   constructor()
   {
      this.accounts=[];
   }

   getAccounts() 
   {
    return this.accounts;
  }

   addAccount()
   {
       this.accounts.push(new Account(Bank.nextNumber++));  
       return Bank.nextNumber-1; 
   }

   addSavingsAccount(interest)
   {
       this.accounts.push(new SavingsAccount(Bank.nextNumber++,interest));  
       return Bank.nextNumber-1;
   }

   addCheckingAccount(overdraft) 
   {
       this.accounts.push(new CheckingsAccount(Bank.nextNumber++,overdraft));  
        return Bank.nextNumber-1;
   }

   closeAccount(number) {
    this.accounts = this.accounts.filter(x => x.getNumber() !== number);
}

accountReport() {
    return this.accounts.reduce((prev, curr) => prev.toString() + "\n" + curr.toString(), "");
}

endOfMonth() {
    return this.accounts.map(a => a.endOfMonth()).reduce((prev, curr) => prev + "\n" + curr, "");
}

   static nextNumber=1;
}

