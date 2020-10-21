Python version : 3.79

"pip install pytest"  to install pytest package

"python -m pip install --upgrade pip" to upgrade pip if needed

'pytest' or 'Python -m pytest' to run pytest and check all the testcases
'pytest -v' to get a detailed report


Created a tests directory under the application root.
Inside the tests folder, every test file should start with test_*, it will be auto-discoverable by pytest.

conftest.py, where all the common fixtures among this directory should be in.
A pytest fixture(client), will be called by each individual test. It initialized a simple application(webpage) to every test.


