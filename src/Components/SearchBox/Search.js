import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { DatePicker, Select } from 'antd';

const { Option } = Select;
// import Select from 'react-select';
const Search = (props) => {
    const { searchMovies, getByDate,filterLang } = props;
    return (
        <>
            <div className="SearchWrap">

                <DatePicker onChange={getByDate} picker="year" bordered={false} className="pickerSection"/>
                <Select
                    labelInValue
                    defaultValue={{ value: 'Select Language' }}
                     onChange={filterLang}
                    className="selectSection"
                    >
                    <Option value="en">English</Option>
                    <Option value="other">Other</Option>
                </Select>
                <div className="searchField">
                    <input type="text" onChange={searchMovies} className="searchTerm" placeholder="Search in Movies" />
                    <button type="submit" className="searchButton">
                        <SearchOutlined />
                    </button>
                </div>
            </div>
        </>
    )
}
export default Search;

