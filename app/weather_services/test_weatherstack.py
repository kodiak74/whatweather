''' Test cases for the WeatherStack web service '''
import unittest
from . import weatherStack

class TestWeatherStack(unittest.TestCase):

    def test_fetch(self):
        ''' Simple working test '''
        res = weatherStack.fetch_weather()
        self.assertIsNotNone(res)    

    def test_format(self):
        ''' Test result format '''
        res = weatherStack.fetch_weather()
        print(res)
        self.assertIsNotNone(res['location'])
        self.assertIsNotNone(res['temperature'])
        self.assertIsNotNone(res['humidity'])
        self.assertIsNotNone(res['wind'])
        self.assertIsNotNone(res['cloud'])
        self.assertIsNotNone(res['pressure'])

    # def test_fail(self):
    #     self.assertFalse(True)    
 
if __name__ == '__main__':
    unittest.main()