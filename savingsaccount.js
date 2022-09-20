
class SavingsAccount extends Account
{
       constructor(number,interest)
       {
            super(number);
            this._interest=interest;
       }

       getInterest() 
       {
          return this._interest;
       }

       setInterest(interest)
       {
         this._interest=interest;
       }

       addInterest()
       {
              super.deposit(super.getBalance() * this.getInterest() / 100);
       }

       toString()
       {
            return "Savings Account " + this.getNumber() +": interest "+ this._interest+ ": balance " + this.getBalance();
       }

       endOfMonth() 
       {
            this.addInterest();
            return "Interest added SavingsAccount "+this.getNumber()+": balance:"+this.getBalance()+" interest:"+this.getInterest();
       }

}