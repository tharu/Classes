
class CheckingsAccount extends Account
{
       constructor(number,overdraftlimit)
       {
            super(number);
            this._overdraftLimit=overdraftlimit;
       }

       getOverdraftLimit() 
       {
          return this._overdraftLimit;
       }

       setInterest(overdraftlimit)
       {
         this._overdraftLimit=overdraftlimit;
       }

       withdraw(amount) 
       {
            if (amount <= 0) {
                throw new RangeError("Withdraw amount has to be greater than zero");
            }
            if (amount > this._balance+this._overdraftLimit) {
                throw Error("Insufficient funds");
            }
            this._balance -= amount;
      }

       toString()
       {
            return "Checking Account " + super.getNumber() +": overdraftlimit "+ this.getOverdraftLimit()+ ": balance " + super.getBalance();
       }

       endOfMonth() {
        return this._balance < 0 ? "Warning, low balance CheckingAccount "+this.getNumber()+": balance:"+this.getBalance()+"overdraft limit: "+this.getOverdraftLimit()
            : "No action for Checking account";
    }

}