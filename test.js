var account1= new Account("1234567");
var savingsAccount1= new SavingsAccount("35888",10);
var checkingAccount1= new CheckingsAccount("789",200);

window.onload = tester;

function tester()
{
    describe("testgetNumber", function(){
        it("test get number", function(){
        assert.equal(account1.getNumber(), "1234567"); 
        });
    });

    describe("testgetInitialBalance", function(){
        it("test get Initial balance", function()
        {
        assert.equal(account1.getBalance(),0);
        });
    });

    describe('Deposit Tests', () => {

        describe("testdeposit- amount>0", function(){
            it("test deposit- positive amount", function(){
            account1.deposit(1000);
            assert.equal(account1.getBalance(),1000); 
            });
        });


        describe("testdeposit- amount< 0", function(){
            it("test deposit- negative amount", function(){
            assert.throws(account1.deposit(-100), RangeError,"Deposit amount has to be greater than zero"); 
            });
        });

        describe("testdeposit- amount= 0", function(){
            it("test deposit- 0 amount", function(){
            assert.throws(account1.deposit(0), RangeError,"Deposit amount has to be greater than zero"); 
            });
        });
});

describe('Withdraw Tests', () => {

    describe("test withdraw- amount>0", function(){
        it("test withdraw- positive amount", function(){
         account1._balance=0;
         account1.deposit(2000);
         account1.withdraw(1000);
        assert.equal(account1.getBalance(),1000); 
        });
    });


    describe("test withdraw- amount< 0", function(){
        it("test withdraw- negative amount", function(){
          account1.deposit(200);
          assert.throws(account1.withdraw(-100), RangeError,"Withdraw amount has to be greater than zero"); 
        });
    });

    describe("test withdraw- amount< 0", function(){
        it("test withdraw- negative amount", function(){
          account1._balance=0;
          account1.deposit(200);
          assert.throws(account1.withdraw(300), Error,"Insufficient funds"); 
        });
    });

    describe("test withdraw- amount= 0", function(){
        it("test withdraw- 0 amount", function(){
          account1.deposit(200);
          assert.throws(account1.deposit(0), RangeError,"Withdraw amount has to be greater than zero"); 
        });
    });
});

    describe("test endOfMonth()", function(){
        it("test endOfMonth()", function(){
        assert.equal(account1.endOfMonth(), ""); 
        });
    });

    describe("test toString()", function(){
        it("test toString()", function(){
        account1._balance=0;
        account1.deposit(1000);
        account1.withdraw(100);
        assert.equal(account1.toString(), "Account 1234567: balance 900"); 
        });
    });

    describe("test savings account - toString()", function(){
        it("test savings account - toString()", function(){
        savingsAccount1._balance=0;
        savingsAccount1.deposit(1000);
        savingsAccount1.addInterest();
        assert.equal(savingsAccount1.toString(), "Savings Account 35888: interest 10: balance 1100"); 
        });
    });


    describe("test Checking account withdraw- amount with in overdraft limit", function(){
        it("test withdraw checking account ", function(){
          checkingAccount1.deposit(200);//over draft 200
          checkingAccount1.withdraw(300);
          assert.equal(checkingAccount1.getBalance(),-100); 
        });
    });

    describe("test Checking account withdraw- amount exceeds overdraft limit", function(){
        it("test withdraw checking account - amount > overdraft limit ", function(){
          account1._balance=0;
          account1.deposit(200);//over draft 200
          assert.throws(account1.withdraw(500), Error,"Insufficient funds"); 
        });
    });

    describe("test Checking account toString()", function(){
        it("test toString()", function(){
        checkingAccount1._balance=0;
        checkingAccount1.deposit(200);
        checkingAccount1.withdraw(400);
        assert.equal(checkingAccount1.toString(), "Checking Account 789: overdraftlimit 200: balance -200"); 
        });
    })


    describe('Bank Tests', () => {

        let bank;
        beforeEach(() => {
            bank = new Bank()
        });
        describe('Account Actions', () => {
    
            describe('Account Addition', () => {
                describe('Default Account', () => {
                    it('should successfully add a default Account', () => {
                        bank.addAccount();
                        expect(bank.getAccounts().length).to.eql(1);
                        expect(bank.getAccounts()[0].getNumber()).to.eql(1);
                    });
                });
    
                describe('Savings Account', () => {
                    it('should successfully add a savings Account', () => {
                        bank.addSavingsAccount(5);
                        expect(bank.getAccounts().length).to.eql(1);
                        expect(bank.getAccounts()[0].getNumber()).to.eql(2);
                        expect(bank.getAccounts()[0].getInterest()).to.eql(5);
                    });
                });
    
                describe('Checking Account', () => {
                    it('should successfully add a checking Account', () => {
                        bank.addCheckingAccount(200);
                        expect(bank.getAccounts().length).to.eql(1);
                        expect(bank.getAccounts()[0].getNumber()).to.eql(3);
                        expect(bank.getAccounts()[0].getOverdraftLimit()).to.eql(200);
                    });
                });
            });
    
            describe('Account Closure', () => {
                it('should successfully close an Account in the Bank', () => {
                    bank.addCheckingAccount(200);
                    const accountToClose = bank.getAccounts()[0];
                    bank.closeAccount(4);
                    expect(bank.getAccounts().length).to.eql(0);
                    expect(bank.getAccounts().includes(accountToClose)).to.be.false;
                });
            });
        });
    
    
        describe('Account Report', () => {
            it('should generate an account report for all bank accounts within the bank', () => {
                bank.addSavingsAccount(5);
                bank.addSavingsAccount(10);
                bank.addCheckingAccount(300);
    
                expect(bank.accountReport()).to.eql("\nSavings Account 5: interest 5: balance 0" +
                    "\nSavings Account 6: interest 10: balance 0\n" +
                    "\Checking Account 7: overdraftlimit 300: balance 0");
            });
        });
    
    //     describe('End Of month test', () => {
    //         it('should generate and endOfMonth Status by Performing needed actions at the end of the month', () => {
    //             bank.addSavingsAccount(5);
    //             bank.addSavingsAccount(10);
    //             bank.addCheckingAccount(300);
    //             console.log(bank.endOfMonth());
    //             expect(bank.endOfMonth()).to.eql("\nInterest added SavingsAccount 8: balance: 0 interest: 5" +
    //                 "\nInterest added SavingsAccount 9: balance: 0 interest: 10" +
    //                 "\nNo action for Checking account");
    //         });
    //     });
    // });
    mocha.run();



});
}
