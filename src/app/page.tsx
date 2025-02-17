'use client'
import React, { useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Share2, Printer } from 'lucide-react';

const DynamicResumeBuilder = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    summary: '',
    skills: '',
    workExperience: [
      { title: '', company: '', period: '', responsibilities: '' }
    ]
  });

  const previewRef = useRef(null);

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleWorkExperienceChange = (index, field, value) => {
    const newWorkExperience = [...formData.workExperience];
    newWorkExperience[index][field] = value;
    setFormData(prev => ({
      ...prev,
      workExperience: newWorkExperience
    }));
  };

  const addWorkExperience = () => {
    setFormData(prev => ({
      ...prev,
      workExperience: [...prev.workExperience, { title: '', company: '', period: '', responsibilities: '' }]
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  const shareResume = async () => {
    try {
      await navigator.share({
        title: 'My Resume',
        text: 'Check out my professional resume',
        url: window.location.href
      });
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 print:p-0 print:bg-white">
      {/* Added text-center class to the main heading container */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Resume Builder</h1>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 print:block print:gap-0">
          {/* Form Section - Hidden when printing */}
          <Card className="p-6 print:hidden">
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              <input
                type="url"
                name="linkedin"
                placeholder="LinkedIn Profile"
                value={formData.linkedin}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              <textarea
                name="summary"
                placeholder="Professional Summary"
                value={formData.summary}
                onChange={handleChange}
                className="w-full p-2 border rounded h-32"
              />
              <textarea
                name="skills"
                placeholder="Skills (comma separated)"
                value={formData.skills}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Work Experience</h3>
                {formData.workExperience.map((exp, index) => (
                  <div key={index} className="space-y-2 p-4 border rounded">
                    <input
                      type="text"
                      placeholder="Job Title"
                      value={exp.title}
                      onChange={(e) => handleWorkExperienceChange(index, 'title', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                    <input
                      type="text"
                      placeholder="Company"
                      value={exp.company}
                      onChange={(e) => handleWorkExperienceChange(index, 'company', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                    <input
                      type="text"
                      placeholder="Period (e.g., Jan 2020 - Present)"
                      value={exp.period}
                      onChange={(e) => handleWorkExperienceChange(index, 'period', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                    <textarea
                      placeholder="Responsibilities"
                      value={exp.responsibilities}
                      onChange={(e) => handleWorkExperienceChange(index, 'responsibilities', e.target.value)}
                      className="w-full p-2 border rounded h-24"
                    />
                  </div>
                ))}
                <Button onClick={addWorkExperience} className="w-full">
                  Add Work Experience
                </Button>
              </div>
            </div>
          </Card>

          {/* Preview Section */}
          <div className="relative print:m-0">
            <Card className="p-6 print:shadow-none print:p-0">
              <div className="flex justify-end space-x-2 mb-4 print:hidden">
                <Button onClick={shareResume} variant="outline">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button onClick={handlePrint}>
                  <Printer className="w-4 h-4 mr-2" />
                  Print PDF
                </Button>
              </div>
              
              <div ref={previewRef} className="preview-content">
                <div className="mb-6">
                  <h1 className="text-3xl font-bold">{formData.name || 'Your Name'}</h1>
                  <div className="text-gray-600 mt-2">
                    {formData.email && <div>{formData.email}</div>}
                    {formData.phone && <div>{formData.phone}</div>}
                    {formData.linkedin && <div>{formData.linkedin}</div>}
                  </div>
                </div>

                {formData.summary && (
                  <div className="mb-6">
                    <h2 className="text-xl font-bold mb-2">Professional Summary</h2>
                    <p className="text-gray-700">{formData.summary}</p>
                  </div>
                )}

                {formData.skills && (
                  <div className="mb-6">
                    <h2 className="text-xl font-bold mb-2">Core Skills</h2>
                    <div className="flex flex-wrap gap-2">
                      {formData.skills.split(',').map((skill, index) => (
                        <span key={index} className="bg-gray-100 px-3 py-1 rounded print:border">
                          {skill.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {formData.workExperience.some(exp => exp.title || exp.company) && (
                  <div>
                    <h2 className="text-xl font-bold mb-4">Work Experience</h2>
                    {formData.workExperience.map((exp, index) => (
                      <div key={index} className="mb-4">
                        {exp.title && <h3 className="font-semibold">{exp.title}</h3>}
                        <div className="text-gray-600">
                          {exp.company && <span>{exp.company}</span>}
                          {exp.period && <span className="ml-2">| {exp.period}</span>}
                        </div>
                        {exp.responsibilities && (
                          <p className="mt-2 text-gray-700">{exp.responsibilities}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicResumeBuilder;